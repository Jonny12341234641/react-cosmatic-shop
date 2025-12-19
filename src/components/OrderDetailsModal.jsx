import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

/**
 * OrderDetailsModal Component
 * =============================================================================
 * A modal overlay that displays comprehensive details for a specific order.
 * It allows administrators to view customer info, shipping details, and order items,
 * as well as update the order status via an API.
 * * @param {boolean} isModalOpen - Boolean flag controlling visibility.
 * @param {function} closeModal - Callback function to close the modal.
 * @param {object} selectedOrder - The data object containing order details.
 * @param {function} refresh - Callback to trigger a data refresh in the parent component.
 * =============================================================================
 */
export default function OrderDetailsModal({ isModalOpen, closeModal, selectedOrder, refresh }) {

  // State Initialization:
  // 'currentStatus' tracks the value of the status dropdown.
  // We initialize it with the selected order's status if available to avoid null references.
  const [currentStatus, setCurrentStatus] = useState(selectedOrder ? selectedOrder.status : "");

  // Effect Hook: State Synchronization
  // When the 'selectedOrder' prop changes (e.g., when a user clicks a different order),
  // we must update 'currentStatus' to reflect the new order's status immediately.
  useEffect(() => {
    if (selectedOrder) {
      setCurrentStatus(selectedOrder.status);
    }
  }, [selectedOrder]);  

  
  // Conditional Rendering:
  // If the modal is flagged as closed or no order data is present, render nothing.
  if (!isModalOpen || !selectedOrder) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-center bg-black/50 backdrop-blur-sm transition-opacity">
      
      {/* Modal Card Container */}
      <div className="w-11/12 max-w-2xl h-auto max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* 1. MODAL HEADER 
            Contains the title, order ID, order date, and the close button.
        */}
        <div className="bg-[#fef3e2] p-6 flex justify-between items-center border-b border-[#fa812f]/20">
          <div>
            <span className="text-sm font-bold text-[#fa812f] uppercase tracking-wider">Order Details</span>
            <h2 className="text-2xl font-bold text-[#393e46] mt-1">#{selectedOrder.orderID}</h2>
            <p className="text-sm text-gray-500">
              Placed on {new Date(selectedOrder.date).toLocaleDateString("en-GB")}
            </p>
          </div>
          
          {/* Close Button */}
          <button 
            onClick={closeModal}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#393e46] hover:bg-[#fa812f] hover:text-white transition-all shadow-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* 2. SCROLLABLE CONTENT BODY 
            Contains order status, customer details, address, and the item list.
        */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          
          {/* Info Grid: Status, Customer, Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            
            {/* Status Display Section */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex flex-col justify-center">
              <h3 className="font-semibold text-[#393e46] mb-2">Order Status</h3>
              <div className="flex items-center gap-2">
                {/* Dynamic Status Badge Styling based on status value */}
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

            {/* Customer Information Section */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <h3 className="font-semibold text-[#393e46] mb-2">Customer Info</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-medium text-[#393e46]">Name:</span> {selectedOrder.customerName}</p>
                <p><span className="font-medium text-[#393e46]">Phone:</span> {selectedOrder.phone}</p>
                <p><span className="font-medium text-[#393e46]">Email:</span> {selectedOrder.email}</p>
              </div>
            </div>

            {/* Shipping Address Section */}
            <div className="md:col-span-2 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <h3 className="font-semibold text-[#393e46] mb-1">Shipping Address</h3>
              <p className="text-sm text-gray-600">{selectedOrder.address}</p>
            </div>
          </div>

          {/* Items List Table */}
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
                {/* Iterating through items to render table rows */}
                {selectedOrder.items.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-3 flex items-center gap-3">
                      
                      {/* Product Image with Fallback */}
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
                      
                      {/* Product Details */}
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

        {/* 3. MODAL FOOTER 
            Contains the Update button, Status Dropdown, and Total Price.
        */}
        <div className="bg-[#fef3e2] p-4 flex justify-between items-center border-t border-[#fa812f]/20">
          
          {/* Update Button Logic 
              Handles the API call to update the order status.
          */}
          <button
            onClick={() => {
              // Step 1: Retrieve authentication token from local storage
              const token = localStorage.getItem("token");
              
              // Step 2: Construct the API PUT request
              axios.put(
                import.meta.env.VITE_API_URL + "/api/orders/status/" + selectedOrder.orderID, 
                { status: currentStatus }, // Payload: new status
                {
                  headers: {
                    Authorization: `Bearer ${token}`, // Header: Auth token
                  }
                }
              ).then((response) => {
                // Step 3 (Success): Log response, show toast, close modal, and refresh parent data
                console.log(response.data);
                toast.success("Status updated");
                closeModal();
                refresh();
              }).catch((error) => {
                // Step 4 (Error): Log error and show failure toast
                console.log(error);
                toast.error("Failed to update status");
              });
            }}
            // Disable button if no status change has been made to prevent unnecessary API calls
            disabled={currentStatus === selectedOrder.status}
            className="px-6 py-2 text-sm font-semibold text-[#393e46] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Update
          </button>

          {/* Status Selection Dropdown */}
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
          
          {/* Grand Total Display */}
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