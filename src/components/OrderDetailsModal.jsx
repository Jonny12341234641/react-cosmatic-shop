// import React from 'react';

// /**
//  * A modal component to display the details of an order.
//  * @param {boolean} isModalOpen - Whether the modal is open or not.
//  * @param {function} closeModal - Function to close the modal.
//  * @param {object} selectedOrder - The selected order object.
//  * @param {function} refresh - Function to refresh the page.
//  */
// export default function OrderDetailsModal({ isModalOpen, closeModal, selectedOrder, refresh }) {

//   // 1. Local state to manage the dropdown selection
//   const [currentStatus, setCurrentStatus] = useState(selectedOrder.status);

//   // 2. Sync local state when the modal opens or the selected order changes
//   useEffect(() => {
//     if (selectedOrder) {
//       setCurrentStatus(selectedOrder.status);
//     }
//   }, [selectedOrder]);  

  
//   // If modal is closed or no order is selected, render nothing
//   if (!isModalOpen || !selectedOrder) return null;

//   const handleStatusChange = (e) => {
//       const newStatus = e.target.value;
//       setCurrentStatus(newStatus);
      
//       // TODO: Here you would typically make an API call to update the backend
//       // axios.put(`/api/orders/${selectedOrder.orderID}`, { status: newStatus })
//       //   .then(() => {
//       //      toast.success("Status updated");
//       //      refresh(); // Call the parent's refresh function to reload the table data
//       //   });
//       console.log(`Status for ${selectedOrder.orderID} changed to: ${newStatus}`);
//   };
  

//   return (
//     <div className="fixed inset-0 z-[100] flex justify-center items-center bg-black/50 backdrop-blur-sm transition-opacity">
//       {/* Modal Container */}
//       <div className="w-11/12 max-w-2xl h-auto max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
//         {/* --- HEADER --- */}
//         <div className="bg-[#fef3e2] p-6 flex justify-between items-center border-b border-[#fa812f]/20">
//           <div>
//             <span className="text-sm font-bold text-[#fa812f] uppercase tracking-wider">Order Details</span>
//             <h2 className="text-2xl font-bold text-[#393e46] mt-1">#{selectedOrder.orderID}</h2>
//             <p className="text-sm text-gray-500">
//               Placed on {new Date(selectedOrder.date).toLocaleDateString("en-GB")}
//             </p>
//           </div>
//           <button 
//             onClick={closeModal}
//             className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#393e46] hover:bg-[#fa812f] hover:text-white transition-all shadow-sm font-bold"
//           >
//             ✕
//           </button>
//         </div>

//         {/* --- SCROLLABLE BODY --- */}
//         <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          
//           {/* Status & Customer Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            
//             {/* Status Section */}
//             <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex flex-col justify-center">
//               <h3 className="font-semibold text-[#393e46] mb-2">Order Status</h3>
//               <div className="flex items-center gap-2">
//                 <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${
//                   selectedOrder.status === 'Pending' ? 'bg-orange-100 text-orange-600 border-orange-200' :
//                   selectedOrder.status === 'Shipped' ? 'bg-blue-100 text-blue-600 border-blue-200' :
//                   selectedOrder.status === 'Delivered' ? 'bg-green-100 text-green-600 border-green-200' :
//                   'bg-gray-100 text-gray-600 border-gray-200'
//                 }`}>
//                   {selectedOrder.status}
//                 </span>
//                 {/* Note: This is where you could add an "Edit Status" button using the refresh prop later */}
//               </div>
//             </div>

//             {/* Customer Section */}
//             <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
//               <h3 className="font-semibold text-[#393e46] mb-2">Customer Info</h3>
//               <div className="text-sm text-gray-600 space-y-1">
//                 <p><span className="font-medium text-[#393e46]">Name:</span> {selectedOrder.customerName}</p>
//                 <p><span className="font-medium text-[#393e46]">Phone:</span> {selectedOrder.phone}</p>
//                 <p><span className="font-medium text-[#393e46]">Email:</span> {selectedOrder.email}</p>
//               </div>
//             </div>

//             {/* Address Section */}
//             <div className="md:col-span-2 p-4 rounded-xl bg-gray-50 border border-gray-100">
//               <h3 className="font-semibold text-[#393e46] mb-1">Shipping Address</h3>
//               <p className="text-sm text-gray-600">{selectedOrder.address}</p>
//             </div>
//           </div>

//           {/* Items Table */}
//           <h3 className="font-semibold text-[#393e46] mb-3">Items Ordered</h3>
//           <div className="border border-gray-100 rounded-xl overflow-hidden">
//             <table className="w-full text-left text-sm">
//               <thead className="bg-[#fef3e2] text-[#393e46]">
//                 <tr>
//                   <th className="p-3 font-semibold">Product</th>
//                   <th className="p-3 font-semibold text-center">Qty</th>
//                   <th className="p-3 font-semibold text-right">Price</th>
//                   <th className="p-3 font-semibold text-right">Subtotal</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {selectedOrder.items.map((item, index) => (
//                   <tr key={index} className="hover:bg-gray-50/50 transition-colors">
//                     <td className="p-3 flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-md bg-white overflow-hidden shrink-0 border border-gray-200 flex items-center justify-center">
//                         <img 
//                           src={item.image} 
//                           alt={item.name} 
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             e.target.style.display = 'none'; // Hide broken image
//                             e.target.parentElement.classList.add('bg-gray-200'); // Add grey bg placeholder
//                           }} 
//                         />
//                       </div>
//                       <div className="flex flex-col">
//                         <span className="font-medium text-[#393e46] line-clamp-1">{item.name}</span>
//                         <span className="text-xs text-gray-400">{item.productID}</span>
//                       </div>
//                     </td>
//                     <td className="p-3 text-center text-gray-600">x{item.quantity}</td>
//                     <td className="p-3 text-right text-gray-600">${item.price.toFixed(2)}</td>
//                     <td className="p-3 text-right font-medium text-[#393e46]">
//                       ${(item.price * item.quantity).toFixed(2)}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* --- FOOTER --- */}
//         <div className="bg-[#fef3e2] p-4 flex justify-between items-center border-t border-[#fa812f]/20">
//           <button
//             onClick={{}=>{
//               const token = localStorage.getItem("token");
//               axios.put(import.meta.env.VITE_API_URL + "/api/orders/status" + selectedOrder.orderID, {
//                 { status : status},
//                 {headers: {
//                   Authorization: `Bearer ${token}`,
//                 }}
//             ).then((response) => {
//               console.log(response.data);
//               toast.success("Status updated");
//               closeModal();
//               refresh();
//             }).catch((error) => {
//               console.log(error);
//               toast.error("Failed to update status");
//             });
//             }}
//             disabled = {status === selectedOrder.status}
//             className="px-6 py-2 text-sm font-semibold text-[#393e46] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
//             Update
//           </button>

//                 {/* Status Dropdown */}
//                 <select 
//                     id="statusSelect"
//                     value={currentStatus}
//                     // onChange={handleStatusChange}
//                     onChange={(e) => {setCurrentStatus(e.target.value)}}
//                     // Styling applied here to match the UI theme
//                     className="w-full pl-4 pr-10 py-2.5 text-sm font-medium text-[#393e46] bg-white border border-gray-200 rounded-lg shadow-sm appearance-none focus:outline-none focus:border-[#fa812f] focus:ring-1 focus:ring-[#fa812f] cursor-pointer transition-all"
//                 >
//                   {/* Note: Values are capitalized to match your probable data model */}
//                   <option value="Pending">Pending</option>
//                   <option value="Processing">Processing</option>
//                   <option value="Shipped">Shipped</option>
//                   <option value="Delivered">Delivered</option>
//                   <option value="Cancelled">Cancelled</option>
//                   <option value="Returned">Returned</option>
//                 </select>
          
//           <div className="flex items-center gap-4">
//             <span className="text-gray-500 font-medium">Grand Total</span>
//             <span className="text-2xl font-bold text-[#fa812f]">
//               ${selectedOrder.total.toFixed(2)}
//             </span>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

//above is the previous code below is the updated code

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

/**
 * A modal component to display the details of an order.
 * @param {boolean} isModalOpen - Whether the modal is open or not.
 * @param {function} closeModal - Function to close the modal.
 * @param {object} selectedOrder - The selected order object.
 * @param {function} refresh - Function to refresh the page.
 */
export default function OrderDetailsModal({ isModalOpen, closeModal, selectedOrder, refresh }) {

  // 1. Local state to manage the dropdown selection
  // Note: Added a check for selectedOrder to prevent crash on initial render if null
  const [currentStatus, setCurrentStatus] = useState(selectedOrder ? selectedOrder.status : "");

  // 2. Sync local state when the modal opens or the selected order changes
  useEffect(() => {
    if (selectedOrder) {
      setCurrentStatus(selectedOrder.status);
    }
  }, [selectedOrder]);  

  
  // If modal is closed or no order is selected, render nothing
  if (!isModalOpen || !selectedOrder) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-center bg-black/50 backdrop-blur-sm transition-opacity">
      {/* Modal Container */}
      <div className="w-11/12 max-w-2xl h-auto max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* --- HEADER --- */}
        <div className="bg-[#fef3e2] p-6 flex justify-between items-center border-b border-[#fa812f]/20">
          <div>
            <span className="text-sm font-bold text-[#fa812f] uppercase tracking-wider">Order Details</span>
            <h2 className="text-2xl font-bold text-[#393e46] mt-1">#{selectedOrder.orderID}</h2>
            <p className="text-sm text-gray-500">
              Placed on {new Date(selectedOrder.date).toLocaleDateString("en-GB")}
            </p>
          </div>
          <button 
            onClick={closeModal}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#393e46] hover:bg-[#fa812f] hover:text-white transition-all shadow-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* --- SCROLLABLE BODY --- */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          
          {/* Status & Customer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            
            {/* Status Section */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex flex-col justify-center">
              <h3 className="font-semibold text-[#393e46] mb-2">Order Status</h3>
              <div className="flex items-center gap-2">
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${
                  selectedOrder.status === 'Pending' ? 'bg-orange-100 text-orange-600 border-orange-200' :
                  selectedOrder.status === 'Shipped' ? 'bg-blue-100 text-blue-600 border-blue-200' :
                  selectedOrder.status === 'Delivered' ? 'bg-green-100 text-green-600 border-green-200' :
                  'bg-gray-100 text-gray-600 border-gray-200'
                }`}>
                  {selectedOrder.status}
                </span>
              </div>
            </div>

            {/* Customer Section */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <h3 className="font-semibold text-[#393e46] mb-2">Customer Info</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-medium text-[#393e46]">Name:</span> {selectedOrder.customerName}</p>
                <p><span className="font-medium text-[#393e46]">Phone:</span> {selectedOrder.phone}</p>
                <p><span className="font-medium text-[#393e46]">Email:</span> {selectedOrder.email}</p>
              </div>
            </div>

            {/* Address Section */}
            <div className="md:col-span-2 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <h3 className="font-semibold text-[#393e46] mb-1">Shipping Address</h3>
              <p className="text-sm text-gray-600">{selectedOrder.address}</p>
            </div>
          </div>

          {/* Items Table */}
          <h3 className="font-semibold text-[#393e46] mb-3">Items Ordered</h3>
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#fef3e2] text-[#393e46]">
                <tr>
                  <th className="p-3 font-semibold">Product</th>
                  <th className="p-3 font-semibold text-center">Qty</th>
                  <th className="p-3 font-semibold text-right">Price</th>
                  <th className="p-3 font-semibold text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {selectedOrder.items.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-white overflow-hidden shrink-0 border border-gray-200 flex items-center justify-center">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none'; 
                            e.target.parentElement.classList.add('bg-gray-200'); 
                          }} 
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-[#393e46] line-clamp-1">{item.name}</span>
                        <span className="text-xs text-gray-400">{item.productID}</span>
                      </div>
                    </td>
                    <td className="p-3 text-center text-gray-600">x{item.quantity}</td>
                    <td className="p-3 text-right text-gray-600">${item.price.toFixed(2)}</td>
                    <td className="p-3 text-right font-medium text-[#393e46]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- FOOTER --- */}
        <div className="bg-[#fef3e2] p-4 flex justify-between items-center border-t border-[#fa812f]/20">
          
          <button
            onClick={() => {
              const token = localStorage.getItem("token");
              // Added a slash '/' before the ID to ensure valid URL path
              axios.put(
                import.meta.env.VITE_API_URL + "/api/orders/status/" + selectedOrder.orderID, 
                { status: currentStatus },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  }
                }
              ).then((response) => {
                console.log(response.data);
                toast.success("Status updated");
                closeModal();
                refresh();
              }).catch((error) => {
                console.log(error);
                toast.error("Failed to update status");
              });
            }}
            disabled={currentStatus === selectedOrder.status}
            className="px-6 py-2 text-sm font-semibold text-[#393e46] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Update
          </button>

          {/* Status Dropdown */}
          <select 
              id="statusSelect"
              value={currentStatus}
              onChange={(e) => {setCurrentStatus(e.target.value)}}
              className="w-full pl-4 pr-10 py-2.5 text-sm font-medium text-[#393e46] bg-white border border-gray-200 rounded-lg shadow-sm appearance-none focus:outline-none focus:border-[#fa812f] focus:ring-1 focus:ring-[#fa812f] cursor-pointer transition-all mx-4"
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Returned">Returned</option>
          </select>
          
          <div className="flex items-center gap-4">
            <span className="text-gray-500 font-medium">Grand Total</span>
            <span className="text-2xl font-bold text-[#fa812f]">
              ${selectedOrder.total.toFixed(2)}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}