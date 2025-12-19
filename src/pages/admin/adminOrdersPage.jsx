import axios from "axios";
import { useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader } from "../../components/loader.jsx";
import OrderDetailsModal from "../../components/OrderDetailsModal.jsx";

/**
 * AdminOrdersPage Component
 * =============================================================================
 * This component acts as the main dashboard for administrators to view and manage 
 * incoming orders.
 * * Functional Overview:
 * 1. Authentication: Verifies user tokens before fetching sensitive order data.
 * 2. Data Fetching: Retrieves a list of orders from the backend API.
 * 3. State Management: Handles loading states, modal visibility, and selection.
 * 4. UI Rendering: Displays a responsive data table with status indicators.
 * =============================================================================
 */
export default function AdminOrdersPage() {

  // --- State Management ---

  // Stores the array of order objects fetched from the API
  const [orders, setOrders] = useState([]);

  // Controls the loading spinner; defaults to true to show loader on mount
  const [isLoading, setIsLoading] = useState(true);

  // Hook for programmatic navigation (e.g., redirecting to login)
  const navigate = useNavigate();

  // Hook to detect route changes
  const location = useLocation();

  // Controls the visibility of the Order Details Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Stores the specific order object clicked by the admin for detailed viewing
  const [selectedOrder, setSelectedOrder] = useState(null);

  /**
   * Effect: Location Listener
   * ---------------------------------------------------------------------------
   * Resets the loading state to true whenever the URL location changes.
   * This ensures data is re-validated or re-fetched if the user navigates 
   * back to this page.
   */
  useEffect(() => {
    setIsLoading(true);
  }, [location]);

  /**
   * Effect: Data Fetching
   * ---------------------------------------------------------------------------
   * Handles the API call to retrieve orders.
   * * Steps:
   * 1. Checks for a valid authentication token in localStorage.
   * 2. If missing, redirects the user to the login page immediately.
   * 3. If present, executes a GET request to '/api/orders' with the Bearer token.
   * 4. Updates the 'orders' state with the response data on success.
   * 5. Handles errors by logging them and displaying a toast notification.
   * 6. Sets 'isLoading' to false regardless of success or failure to remove the spinner.
   */
  useEffect(() => {
    if (isLoading) {
      const token = localStorage.getItem("token");
      
      if (token == null) {
        navigate("/login");
        return;
      } else {
        axios.get(import.meta.env.VITE_API_URL + "/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }).then((response) => {
          console.log(response.data);
          setOrders(response.data);
          setIsLoading(false);
        }).catch((error) => {
          console.error(error);
          toast.error("Failed to fetch orders");
          setIsLoading(false);
        });
      }
    }
  }, [isLoading, navigate]);

  return (
    // Main Container: Full screen height with primary background color
    <div className="w-full h-full min-h-screen bg-primary p-8 font-sans">
      
      {/* Order Details Modal 
        -------------------
        - isModalOpen: Controlled by local state.
        - closeModal: Function to hide the modal.
        - selectedOrder: Passes the specific order data clicked by the user.
        - refresh: Callback to trigger a data re-fetch by setting isLoading to true.
      */}
      <OrderDetailsModal 
        isModalOpen={isModalOpen} 
        closeModal={() => setIsModalOpen(false)} 
        selectedOrder={selectedOrder} 
        refresh={() => setIsLoading(true)}
      />
      
      {/* Table Container: White background with rounded corners and shadow */}
      <div className="overflow-hidden rounded-xl shadow-xl bg-white border border-gray-100">
        
        {/* Conditional Rendering: Show Loader if fetching, otherwise show Table */}
        {isLoading ? (
          <div className="p-10 flex justify-center">
            <Loader />
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              {/* Table Header: Secondary background color with white text */}
              <tr className="bg-secondary text-white text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">ID</th>
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Phone</th>
                <th className="p-4 font-semibold">Address</th>
                <th className="p-4 font-semibold">Total</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Date</th>
              </tr>
            </thead>
            
            <tbody className="text-gray-700">
              {/* Iterate through the orders array to render rows */}
              {orders.map((item) => {
                return (
                  <tr
                    key={item.orderID}
                    // Row Styling: Adds hover effect and pointer cursor to indicate interactivity
                    className="border-b border-gray-100 hover:bg-orange-50 transition duration-150 ease-in-out cursor-pointer"
                    // Click Handler: Opens the modal with the current row's data
                    onClick={() => {
                      setSelectedOrder(item);
                      setIsModalOpen(true);
                    }}
                  >
                    {/* Column 1: Order ID */}
                    <td className="p-4 text-sm font-mono text-gray-500">
                      {item.orderID}
                    </td>
                    
                    {/* Column 2: Customer Name */}
                    <td className="p-4 font-medium text-secondary">
                      {item.customerName}
                    </td>
                    
                    {/* Column 3: Email */}
                    <td className="p-4 text-sm">
                      {item.email}
                    </td>

                    {/* Column 4: Phone */}
                    <td className="p-4 text-sm">
                      {item.phone}
                    </td>

                    {/* Column 5: Address (Truncated to maintain table layout) */}
                    <td className="p-4 text-sm max-w-[200px] truncate">
                      {item.address}
                    </td>

                    {/* Column 6: Total Price */}
                    <td className="p-4 font-bold text-gray-600">
                      ${item.total.toFixed(2)}
                    </td>

                    {/* Column 7: Status Badge 
                        Dynamically applies background/text colors based on status value 
                        (Pending, Shipped, Delivered, etc.)
                    */}
                    <td className="p-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                        item.status === 'Pending' ? 'bg-orange-100 text-orange-600 border-orange-200' :
                        item.status === 'Shipped' ? 'bg-blue-100 text-blue-600 border-blue-200' :
                        item.status === 'Delivered' ? 'bg-green-100 text-green-600 border-green-200' :
                        'bg-gray-100 text-gray-600 border-gray-200'
                      }`}>
                        {item.status}
                      </span>
                    </td>

                    {/* Column 8: Date (Formatted to British English locale) */}
                    <td className="p-4 text-sm">
                      {new Date(item.date).toLocaleDateString("en-GB")}
                    </td>

                    {/* Edit Button (Currently Disabled)
                       Logic for editing is now handled via the Modal, but the code structure 
                       is preserved here for future reference.
                    */}
                    {/* <td className="p-4">
                      <div className="flex flex-row gap-4 justify-center items-center">
                        <button 
                          className="p-2 rounded-full hover:bg-orange-50 transition-colors group"
                          title="Edit" 
                          onClick={(e) => {
                            e.stopPropagation(); 
                            navigate("/admin/update-product", { state : item });
                          }}
                        >
                          <FiEdit3 className="text-gray-400 group-hover:text-accent text-lg transition-colors" />
                        </button>
                      </div>
                    </td> 
                    */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}