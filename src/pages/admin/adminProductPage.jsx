import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit3, FiPlusCircle } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader.jsx";
import mediaUpload, { getMediaUrl } from "../../utilities/mediaUpload.jsx";

function ProductDeleteConfirm(props) {
  const productID = props.productID;
  const onclose = props.onclose;   // <--- We use this function to close the popup
  const refresh = props.refresh;
  
  function deleteProduct() {
    const token = localStorage.getItem("token");

    // FIX 1: Added "/" and fixed the Authorization header quotes
    axios.delete(import.meta.env.VITE_API_URL + "/api/products/" + productID, {
      headers: {
        Authorization: "Bearer " + token  // <--- Double quotes + variable
      }
    }).then((response) => {
      console.log(response.data);
      toast.success("Product deleted successfully");
      
      // FIX 2: Call the prop function to close the window
      onclose(); 
      refresh();
    }).catch((error) => {
      console.log(error);
      toast.error("Failed to delete product");
    });
  }

  return (
    <div className="fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100] flex justify-center items-center">
      <div className="w-[500px] h-[200px] bg-white relative rounded-2xl shadow-2xl flex flex-col justify-center items-center gap-[10px]">
        
        {/* Close Button (Top Right) */}
        <button onClick={onclose} className="absolute right-[-15px] top-[-15px] w-10 h-10 bg-red-600 hover:bg-red-700 flex justify-center items-center rounded-full text-white font-bold shadow-lg">
          X
        </button>

        <p className="text-xl font-semibold text-secondary text-center px-4">
          Are you sure you want to delete <br/> Product ID: <span className="text-accent">{productID}</span>?
        </p>

        <div className="flex gap-[20px] mt-4">
          <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold" onClick={deleteProduct}>
            Yes, Delete
          </button>

          <button className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-semibold" onClick={onclose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

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

export default function AdminProductPage() {
  const [products, setProducts] = useState(sampleProducts);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [productToDelete, setproductToDelete] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
  }, [location]);

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
    // Applied 'bg-primary' for a warm page background
    <div className="w-full h-full min-h-screen bg-primary p-8 font-sans">

      {isDeleteConfirmVisible && <ProductDeleteConfirm refresh={()=>{setIsLoading(true)}} productID={productToDelete} onclose={() => setIsDeleteConfirmVisible(false)}></ProductDeleteConfirm>} {/* Conditional rendering for delete confirmation modal*/}

      <Link to="/admin/add-product" className="fixed right-[50px] bottom-[50px] text-5xl hover:text-accent"><FiPlusCircle className="hover:text-accent"/>
      </Link>
      
      {/* Card container with shadow and rounded corners for a modern look */}
      <div className="overflow-hidden rounded-xl shadow-xl bg-white border border-gray-100">
        
        {isLoading?<div><Loader></Loader></div>:<table className="w-full text-left border-collapse">
          <thead>
            {/* Applied 'bg-secondary' for high contrast header */}
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
            {products.map((item, index) => {
              return (
                <tr
                  key={item.productID}
                  // Hover effect uses a very light opacity of the secondary/accent colors
                  className="border-b border-gray-100 hover:bg-orange-50 transition duration-150 ease-in-out"
                >
                  <td className="p-4">
                    {/* Placeholder for image - added a grey box to look like a skeleton loader */}
                    <div className="w-12 h-12 bg-gray-200 rounded-md">
                      {item.images && item.images.length > 0 && (
                        <img
                          src={getMediaUrl(item.images[0])}
                          alt={item.name}
                          className="object-cover w-full h-full rounded-md"
                        />
                      )}
                    </div>
                  </td>
                  
                  <td className="p-4 text-sm font-mono text-gray-500">
                    {item.productID}
                  </td>
                  
                  <td className="p-4 font-medium text-secondary">
                    {item.name}
                  </td>
                  
                  {/* Applied 'text-accent' to emphasize the price */}
                  <td className="p-4 text-accent font-bold">
                    ${item.price}
                  </td>
                  
                  <td className="p-4">
                    <span className="px-3 py-1 text-xs font-semibold bg-primary text-secondary rounded-full border border-orange-100">
                      {item.category}
                    </span>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex flex-row gap-4 justify-center items-center">
                      <button 
                        className="p-2 rounded-full hover:bg-red-50 transition-colors group"
                        title="Delete" onClick={()=>{
                          setproductToDelete(item.productID);
                          setIsDeleteConfirmVisible(true);

                        }}>
                        <FaRegTrashAlt className="text-gray-400 group-hover:text-red-600 text-lg transition-colors" />
                      </button>
                      
                      <button 
                        className="p-2 rounded-full hover:bg-orange-50 transition-colors group"
                        title="Edit" onClick={()=>{
                          navigate("/admin/update-product", {
                            state : item
                          })
                        }}
                      >
                        {/* Swapped FaRegEdit (undefined) for FiEdit3 (imported) */}
                        <FiEdit3 className="text-gray-400 group-hover:text-accent text-lg transition-colors" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>}
      </div>
    </div>
  );
}