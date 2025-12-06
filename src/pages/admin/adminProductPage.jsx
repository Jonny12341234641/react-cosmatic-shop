// import axios from "axios"
// import { useEffect, useState } from "react"
// import { FaRegTrashAlt } from "react-icons/fa";
// import { FiEdit3 } from "react-icons/fi";



// const sampleProducts = [
//     {
//         productID: "ELEC-001",
//         name: "Wireless Noise Cancelling Headphones",
//         altNames: ["Bluetooth Headset", "Over-ear Headphones", "Travel Audio Gear"],
//         description: "Premium over-ear headphones with 30-hour battery life and active noise cancellation.",
//         price: 89.99,
//         labelledPrice: 120.00,
//         category: "Electronics"
//     },
//     {
//         productID: "HOME-045",
//         name: "Ceramic Coffee Mug Set",
//         altNames: ["Tea Cup Set", "Kitchen Mugs", "Gift Set"],
//         description: "Set of 4 minimalist white ceramic mugs, microwave and dishwasher safe.",
//         price: 25.50,
//         labelledPrice: 35.00,
//         category: "Home & Kitchen"
//     },
//     {
//         productID: "GMNG-77",
//         name: "RGB Mechanical Keyboard",
//         altNames: ["Gaming Keyboard", "Clicky Keyboard", "PC Accessory"],
//         description: "Backlit mechanical keyboard with blue switches for tactile feedback.",
//         price: 45.00,
//         labelledPrice: 60.00,
//         category: "Computers"
//     },
//     {
//         productID: "FIT-102",
//         name: "Yoga Mat - Extra Thick",
//         altNames: ["Exercise Mat", "Gym Mat", "Non-slip Mat"],
//         description: "6mm thick eco-friendly foam mat with carrying strap included.",
//         price: 15.99,
//         labelledPrice: 20.00,
//         category: "Fitness"
//     },
//     {
//         productID: "CLTH-559",
//         name: "Men's Cotton Polo Shirt",
//         altNames: ["Casual Shirt", "Collared Tee", "Summer Wear"],
//         description: "Breathable 100% cotton polo shirt available in navy blue.",
//         price: 18.00,
//         labelledPrice: 25.00,
//         category: "Clothing"
//     }
// ];

// // export default function AdminProductPage() {

// //     const [products, setProducts] = useState(sampleProducts);

//     // axios.get(import.meta.env.VITE_API_URL + "/api/products").then(
//     //     (response) => {
//     //         console.log(response.data)
//     //         setProducts(response.data)
//     //     }
//     // ).catch(
//     //     (error) => {
//     //         console.log(error)
//     //     }
//     // )

// //     console.log(products);

// //     return (
// //     <div className="w-full h-full">
// //         <table className="border">
// //             <thead>
// //                 <tr>
// //                     <th>
// //                         productID
// //                     </th>
// //                     <th>
// //                         name
// //                     </th>
// //                     <th>
// //                         altNames
// //                     </th>
// //                     <th>
// //                         description
// //                     </th>
// //                     <th>
// //                         price
// //                     </th>
// //                     <th>
// //                         labelledPrice
// //                     </th>
// //                     <th>
// //                         category
// //                     </th>
// //                 </tr>
// //             </thead>
// //             <tbody>
// //             </tbody>
// //         </table>

// //         {
// //             products.map(
// //                 (item) => {
// //                     return (
// //                         <p className="w-full text-accent">
// //                             {item.name} - {item.price}
// //                         </p>
// //                     )
// //                 }
// //             )
// //         }
// //     </div>
// // )
// // }


// export default function AdminProductPage() {
//   // FIX 1: Removed the extra [] brackets here
//   const [products, setProducts] = useState(sampleProducts);

//   useEffect(  ()=>{
//                 axios.get(import.meta.env.VITE_API_URL + "/api/products").then(
//         (response) => {
//             console.log(response.data)
//             setProducts(response.data)
//         });
//   }  , [] );
  

//   return (
//     <div className="w-full h-full p-4">
//       <table className="border w-full text-left">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="p-2">Image</th>
//             <th className="p-2">Product ID</th>
//             <th className="p-2">Name</th>
//             <th className="p-2">Price</th>
//             <th className="p-2">Category</th>
//             <th className="p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* FIX 2: Moved map inside tbody to create table rows */}
//           {products.map((item, index) => { {/*both index and item.productID can be used as key*/}
//             return (
//               // FIX 3: Added the key prop here. And it is a unique identifier and you must do it for each row...
//               <tr key={item.productID} className="border-b hover:bg-gray-50"> {/* item.productID or index can be used as key. You can use index when you don't have a unique identifier for each row. */}
//                 <td className="p-2">{/* Add image here */}</td>
//                 <td className="p-2">{item.productID}</td>
//                 <td className="p-2">{item.name}</td>
//                 <td className="p-2">${item.price}</td>
//                 <td className="p-2">{item.category}</td>
//                 <td className="flex flex-row gap-[20px] justify-center items-center">
//                   <div>
//                       <button>
//                         <FaRegTrashAlt  className="hover:text red-600 hover:text-2xl"/>
//                       </button>
//                       <button>
//                         <FaRegEdit  className="hover:text-accent"/>
//                       </button>
//                   </div>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }



import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL + "/api/products").then((response) => {
      console.log(response.data);
      setProducts(response.data);
    });
  }, []);

  return (
    // Applied 'bg-primary' for a warm page background
    <div className="w-full h-full min-h-screen bg-primary p-8 font-sans">
      <Link to="/admin/add-product" className="fixed right-[50px] bottom-[50px] text-5xl hover:text-accent"><FiPlusCircle className="hover:text-accent"/>
      </Link>
      
      {/* Card container with shadow and rounded corners for a modern look */}
      <div className="overflow-hidden rounded-xl shadow-xl bg-white border border-gray-100">
        
        <table className="w-full text-left border-collapse">
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
                    <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
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
                        title="Delete"
                      >
                        <FaRegTrashAlt className="text-gray-400 group-hover:text-red-600 text-lg transition-colors" />
                      </button>
                      
                      <button 
                        className="p-2 rounded-full hover:bg-orange-50 transition-colors group"
                        title="Edit"
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
        </table>
      </div>
    </div>
  );
}