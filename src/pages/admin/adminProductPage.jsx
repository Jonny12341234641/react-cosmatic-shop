import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit3, FiPlusCircle } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader.jsx";

/**
 * ProductDeleteConfirm Component
 * =============================================================================
 * A modal overlay component that prompts the user for confirmation before 
 * deleting a specific product.
 * * Props:
 * - productID: The unique identifier of the product to be deleted.
 * - onclose: Callback function to close the modal.
 * - refresh: Callback function to refresh the parent list after deletion.
 * =============================================================================
 */
function ProductDeleteConfirm(props) {
  
  const productID = props.productID;
  const onclose = props.onclose;   
  const refresh = props.refresh;
  
  /**
   * deleteProduct Function
   * ---------------------------------------------------------------------------
   * Handles the asynchronous deletion of a product.
   * * Steps:
   * 1. Retrieves the authentication token from local storage.
   * 2. Sends a DELETE request to the backend API targeting the specific product ID.
   * 3. Includes the Bearer token in the request headers for authorization.
   * 4. On Success:
   * - Logs the response.
   * - Displays a success toast notification.
   * - Closes the modal using the 'onclose' prop.
   * - Refreshes the product list using the 'refresh' prop.
   * 5. On Failure:
   * - Logs the error.
   * - Displays an error toast notification.
   * ---------------------------------------------------------------------------
   */
  function deleteProduct() {
    const token = localStorage.getItem("token");

    axios.delete(import.meta.env.VITE_API_URL + "/api/products/" + productID, {
      headers: {
        Authorization: "Bearer " + token 
      }
    }).then((response) => {
      console.log(response.data);
      toast.success("Product deleted successfully");
      
      onclose(); 
      refresh();
    }).catch((error) => {
      console.log(error);
      toast.error("Failed to delete product");
    });
  }

  return (
    <div className="fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100] flex justify-center items-center">
      
      {/* Modal Container */}
      <div className="w-[500px] h-[200px] bg-white relative rounded-2xl shadow-2xl flex flex-col justify-center items-center gap-[10px]">
        
        {/* Close Button (Top Right) */}
        <button 
          onClick={onclose} 
          className="absolute right-[-15px] top-[-15px] w-10 h-10 bg-red-600 hover:bg-red-700 flex justify-center items-center rounded-full text-white font-bold shadow-lg"
        >
          X
        </button>

        {/* Confirmation Message */}
        <p className="text-xl font-semibold text-secondary text-center px-4">
          Are you sure you want to delete <br/> Product ID: <span className="text-accent">{productID}</span>?
        </p>

        {/* Action Buttons */}
        <div className="flex gap-[20px] mt-4">
          <button 
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold" 
            onClick={deleteProduct}
          >
            Yes, Delete
          </button>

          <button 
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-semibold" 
            onClick={onclose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// Sample data used for initial state initialization
const sampleProducts = [
  {
    productID: "ELEC-001",
    name: "Wireless Noise Cancelling Headphones",
    altNames: ["Bluetooth Headset", "Over-ear Headphones", "Travel Audio Gear"],
    description: "Premium over-ear headphones with 30-hour battery life and active noise cancellation.",
    price: 89.99,
    labelledPrice: 120.0,
    category: "Electronics",
  },
  {
    productID: "HOME-045",
    name: "Ceramic Coffee Mug Set",
    altNames: ["Tea Cup Set", "Kitchen Mugs", "Gift Set"],
    description: "Set of 4 minimalist white ceramic mugs, microwave and dishwasher safe.",
    price: 25.5,
    labelledPrice: 35.0,
    category: "Home & Kitchen",
  },
  {
    productID: "GMNG-77",
    name: "RGB Mechanical Keyboard",
    altNames: ["Gaming Keyboard", "Clicky Keyboard", "PC Accessory"],
    description: "Backlit mechanical keyboard with blue switches for tactile feedback.",
    price: 45.0,
    labelledPrice: 60.0,
    category: "Computers",
  },
  {
    productID: "FIT-102",
    name: "Yoga Mat - Extra Thick",
    altNames: ["Exercise Mat", "Gym Mat", "Non-slip Mat"],
    description: "6mm thick eco-friendly foam mat with carrying strap included.",
    price: 15.99,
    labelledPrice: 20.0,
    category: "Fitness",
  },
  {
    productID: "CLTH-559",
    name: "Men's Cotton Polo Shirt",
    altNames: ["Casual Shirt", "Collared Tee", "Summer Wear"],
    description: "Breathable 100% cotton polo shirt available in navy blue.",
    price: 18.0,
    labelledPrice: 25.0,
    category: "Clothing",
  },
];

/**
 * AdminProductPage Component
 * =============================================================================
 * The main dashboard view for administrators to manage the product inventory.
 * * Functional Overview:
 * 1. Fetches product data from the API on mount or refresh.
 * 2. Displays a table of products with images, details, and pricing.
 * 3. Provides controls to Add, Edit, and Delete products.
 * 4. Manages the visibility of the deletion confirmation modal.
 * =============================================================================
 */
export default function AdminProductPage() {
  
  // State Management
  const [products, setProducts] = useState(sampleProducts);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [productToDelete, setproductToDelete] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  
  // Navigation Hooks
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Effect: Location Change Listener
   * ---------------------------------------------------------------------------
   * Resets the loading state to true whenever the user navigates.
   * This triggers the data fetching effect below.
   */
  useEffect(() => {
    setIsLoading(true);
  }, [location]);

  /**
   * Effect: Data Fetching
   * ---------------------------------------------------------------------------
   * Fetches the product list from the API when 'isLoading' is true.
   * * Steps:
   * 1. Check if 'isLoading' is true.
   * 2. Send GET request to products API.
   * 3. Update 'products' state with response data.
   * 4. Set 'isLoading' to false to stop the loader and render the table.
   */
  useEffect(() => {
    if(isLoading){
      axios.get(import.meta.env.VITE_API_URL + "/api/products").then((response) => {
        console.log(response.data);
        setProducts(response.data);
        setIsLoading(false);
      });
    }
  }, [isLoading]);

  return (
    // Main Page Container: Full screen height with primary background
    <div className="w-full h-full min-h-screen bg-primary p-8 font-sans">

      {/* Conditional Rendering: Product Deletion Modal 
          If 'isDeleteConfirmVisible' is true, show the modal.
          Passes the specific 'productToDelete' ID and logic to refresh the page/close modal.
      */}
      {isDeleteConfirmVisible && (
        <ProductDeleteConfirm 
          refresh={() => { setIsLoading(true) }} 
          productID={productToDelete} 
          onclose={() => setIsDeleteConfirmVisible(false)} 
        />
      )}

      {/* Floating Action Button (FAB): Link to Add Product Page */}
      <Link 
        to="/admin/add-product" 
        className="fixed right-[50px] bottom-[50px] text-5xl hover:text-accent"
      >
        <FiPlusCircle className="hover:text-accent"/>
      </Link>
      
      {/* Table Container: White card with shadow */}
      <div className="overflow-hidden rounded-xl shadow-xl bg-white border border-gray-100">
        
        {/* Loading State: Show Loader if fetching, otherwise show Table */}
        {isLoading ? (
          <div>
            <Loader />
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              {/* Table Header: Secondary color background */}
              <tr className="bg-secondary text-white text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Image</th>
                <th className="p-4 font-semibold">Product ID</th>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            
            <tbody className="text-gray-700">
              {/* Map through products array to render rows */}
              {products.map((item, index) => {
                return (
                  <tr
                    key={item.productID}
                    // Row Styling: Hover effect with light accent color
                    className="border-b border-gray-100 hover:bg-orange-50 transition duration-150 ease-in-out"
                  >
                    
                    {/* Column 1: Image */}
                    <td className="p-4">
                      {/* Image container acting as skeleton placeholder */}
                      <div className="w-12 h-12 bg-gray-200 rounded-md">
                        {item.images && item.images.length > 0 && (
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="object-cover w-full h-full rounded-md"
                          />
                        )}
                      </div>
                    </td>
                    
                    {/* Column 2: Product ID */}
                    <td className="p-4 text-sm font-mono text-gray-500">
                      {item.productID}
                    </td>
                    
                    {/* Column 3: Name */}
                    <td className="p-4 font-medium text-secondary">
                      {item.name}
                    </td>
                    
                    {/* Column 4: Price */}
                    <td className="p-4 text-accent font-bold">
                      ${item.price}
                    </td>
                    
                    {/* Column 5: Category Badge */}
                    <td className="p-4">
                      <span className="px-3 py-1 text-xs font-semibold bg-primary text-secondary rounded-full border border-orange-100">
                        {item.category}
                      </span>
                    </td>
                    
                    {/* Column 6: Action Buttons (Delete / Edit) */}
                    <td className="p-4">
                      <div className="flex flex-row gap-4 justify-center items-center">
                        
                        {/* Delete Button */}
                        <button 
                          className="p-2 rounded-full hover:bg-red-50 transition-colors group"
                          title="Delete" 
                          onClick={() => {
                            setproductToDelete(item.productID);
                            setIsDeleteConfirmVisible(true);
                          }}
                        >
                          <FaRegTrashAlt className="text-gray-400 group-hover:text-red-600 text-lg transition-colors" />
                        </button>
                        
                        {/* Edit Button: Navigates to update page with product state */}
                        <button 
                          className="p-2 rounded-full hover:bg-orange-50 transition-colors group"
                          title="Edit" 
                          onClick={() => {
                            navigate("/admin/update-product", {
                              state : item
                            })
                          }}
                        >
                          <FiEdit3 className="text-gray-400 group-hover:text-accent text-lg transition-colors" />
                        </button>
                      </div>
                    </td>
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