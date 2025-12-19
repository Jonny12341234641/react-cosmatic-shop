import axios from "axios";
import { useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader } from "../../components/loader.jsx";
// Assuming OrderDetailsModal is in the components folder based on your file structure
import OrderDetailsModal from "../../components/OrderDetailsModal.jsx"; 

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false); // Changed default to false so it doesn't open on load
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    setIsLoading(true);
  }, [location]);

  useEffect(() => {
      if(isLoading){
        const token = localStorage.getItem("token");
        if (token == null) {
            navigate("/login");
            return;
        } else {
            // FIXED: Removed trailing comma inside the URL string
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
    <div className="w-full h-full min-h-screen bg-primary p-8 font-sans">
      
      {/* FIXED: Prop name 'SelectedOrder' changed to 'selectedOrder' to match the component definition */}
      <OrderDetailsModal 
        isModalOpen={isModalOpen} 
        closeModal={() => setIsModalOpen(false)} 
        selectedOrder={selectedOrder} 
        refresh={() => setIsLoading(true)}
      />
      
      <div className="overflow-hidden rounded-xl shadow-xl bg-white border border-gray-100">
        
        {isLoading ? (
          <div className="p-10 flex justify-center"><Loader /></div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
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
              {orders.map((item) => {
                return (
                  <tr
                    key={item.orderID}
                    className="border-b border-gray-100 hover:bg-orange-50 transition duration-150 ease-in-out cursor-pointer"
                    onClick={() => {
                      setSelectedOrder(item);
                      setIsModalOpen(true);
                    }}
                  >
                    <td className="p-4 text-sm font-mono text-gray-500">
                      {item.orderID}
                    </td>
                    
                    <td className="p-4 font-medium text-secondary">
                      {item.customerName}
                    </td>
                    
                    <td className="p-4 text-sm">
                        {item.email}
                    </td>

                    <td className="p-4 text-sm">
                        {item.phone}
                    </td>

                    <td className="p-4 text-sm max-w-[200px] truncate">
                        {item.address}
                    </td>

                    <td className="p-4 font-bold text-gray-600">
                        ${item.total.toFixed(2)}
                    </td>

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

                    <td className="p-4 text-sm">
                      {/* FIXED: Date object syntax error fixed here */}
                      {new Date(item.date).toLocaleDateString("en-GB")}
                    </td>

                    {/* <td className="p-4">
                      <div className="flex flex-row gap-4 justify-center items-center">
                        <button 
                          className="p-2 rounded-full hover:bg-orange-50 transition-colors group"
                          title="Edit" 
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent row click from firing
                            // You might want to remove this navigation if the Modal handles editing now
                            navigate("/admin/update-product", { state : item });
                          }}
                        >
                          <FiEdit3 className="text-gray-400 group-hover:text-accent text-lg transition-colors" />
                        </button>
                      </div>
                    </td> */}
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