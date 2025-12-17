// import React from "react";
// import { loadCart } from "../utilities/cart.js";
// import { CiCircleChevDown } from "react-icons/ci";
// import { CiCircleChevUp } from "react-icons/ci";


// export default function cartPage() {

//     const cart = loadCart();

//     return (
//         <div className="w-full h-[calc(100vh-100px)] bg-primary flex flex-col items-center pt-[25px]">
//             <div className="w-[400px] h-[400px] bg-green-200 flex flex-col gap-4 p-4 overflow-y-auto">
//                 {
//                     cart.map((item, index) => {
//                         return (
//                             <div key={index} className="w-full h-[120px] bg-white flex">
//                                 <img src={item.image} alt="" className="h-full aspect-square object-cover"/>
//                                 <div className="w-[250px] h-full bg-accent flex flex-col pl-[5px] pt-[10px]">
//                                     <h1 className="text-lg font-semibold p-2 w-full text-wrap">{item.name}</h1>
//                                     {/* productID */}
//                                     <span className="text-sm text-secondary p-2">ID: {item.productID}</span>
//                                 </div>
//                                 <div className="w-[100px] h-full bg-yellow flex flex-col justify-center items-center">
//                                     <CiCircleChevUp className="text-3xl "></CiCircleChevUp>
//                                     <span className="text-4xl font-semibold">{item.quantity}</span>
//                                     <CiCircleChevDown className="text-3xl "></CiCircleChevDown>
//                                 </div>
//                             </div>
//                         )
//                     })
//                 }
//             </div>
//         </div>
//     )
// }

// Above is the previous code. Below is the updated code.

// import React, { useEffect, useState } from "react";
// // import { addToCart, getTotal, loadCart } from "../utilities/cart.js";
// import { CiCircleChevDown } from "react-icons/ci";
// import { CiCircleChevUp } from "react-icons/ci";
// import { BiTrash } from "react-icons/bi";
// import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";


// export default function checkoutPage() {

//     const location = useLocation();
    
//     // Fallback to loadCart() if state is null, or an empty array as a last resort
//     const [cart, setCart] = React.useState(location.state || loadCart() || []);

// /**
//  * Returns the total cost of all items in the cart.
//  * This function iterates through each item in the cart,
//  * multiplies the price of the item by its quantity, and
//  * adds up all these values to get the total cost.
//  * @returns {number} - The total cost of all items in the cart.
//  */
//     function getTotal() {
//         let total = 0;
//         cart.forEach((item) => {
//             total += item.price * item.quantity;
//         });
//         return total;
//     }

//     // const [cartLoaded, setCartLoaded] = React.useState(false);

//     // useEffect(() => {
//     //     if (!cartLoaded) {
//     //         setCart(loadCart());
//     //         setCartLoaded(true);
//     //     }
//     // }, [cartLoaded]);



//     return (
//         // Changed: Main container uses 'bg-primary' (cream) from your theme. 
//         // Added 'gap-6' for spacing and 'py-10' for vertical breathing room.
//         <div className="w-full min-h-screen bg-primary flex flex-col items-center py-10">
            
//             {/* CHANGED HEADER STYLE TO MATCH SCREENSHOT:
//                 - Wrapped in a div for easier centering.
//                 - Split "Your Shopping Cart" into two spans.
//                 - "Your": Uses 'text-secondary' (Dark), Bold, Serif to match "Our".
//                 - "Shopping Cart": Uses 'text-accent' (Orange), Italic, Serif to match "Collection".
//                 - Increased text size to 'text-5xl' for that banner-like appearance.
//             */}
//             <div className="text-center mb-8">
//                 <h1 className="font-serif text-4xl md:text-5xl">
//                     <span className="font-bold text-secondary">Your </span>
//                     <span className="italic font-bold text-accent">Checkout</span>
//                 </h1>
//             </div>

//             {/* Changed: Replaced fixed w-[400px] h-[400px] bg-green-200 with a responsive card.
//                 - 'w-full max-w-3xl': Responsive width that stops growing at a nice reading width.
//                 - 'bg-white': Clean background to contrast with bg-primary.
//                 - 'shadow-xl rounded-2xl': Adds depth and elegance (modern card style).
//                 - 'overflow-hidden': Ensures children don't break the rounded corners.
//             */}
//             <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl flex flex-col overflow-hidden">
                
//                 {/* Changed: Added a scrolling container for the list itself 
//                     if the cart gets too long, keeping the page tidy.
//                 */}
//                 <div className="flex flex-col overflow-y-auto h-full max-h-[600px] divide-y divide-gray-100">
//                     {
//                         cart.map((item, index) => {
//                             return (
//                                 // Changed: Cart Item Container
//                                 // - Removed fixed height (h-[120px]) to allow content to fit naturally.
//                                 // - Added 'p-6' for spacious internal padding.
//                                 // - 'hover:bg-gray-50': Adds a subtle interaction effect.
//                                 <div key={index} className="w-full flex items-center p-6 gap-6 hover:bg-gray-50 transition-colors relative items-center justify-center">

//                                     <button className="absolute top-2 right-2 text-red-500 font-bold right-[-50px] text-2xl rounded-full aspect-square hover:bg-red-500 p-[5px] transition hover:text-white hover:scale-110"
//                                         onClick={
//                                             () => {

//                                             }}>
//                                         <BiTrash></BiTrash>
//                                     </button>

                                    
//                                     {/* FIXED IMAGE ISSUE:
//                                         - Added 'w-24 h-24' (96px): Explicit size ensures the image never collapses to 0 width.
//                                         - Added 'flex-shrink-0': Prevents the text from squashing the image.
//                                         - Added 'rounded-lg border': Makes it look polished.
//                                     */}
//                                     <img 
//                                         src={item.image} 
//                                         alt={item.name} 
//                                         className="w-24 h-24 object-cover rounded-lg flex-shrink-0 border border-gray-200 shadow-sm"
//                                     />

//                                     {/* Changed: Product Details
//                                         - Removed 'bg-accent' (orange background) to improve readability.
//                                         - Used 'flex-1' to take up remaining space.
//                                     */}
//                                     <div className="flex-1 flex flex-col justify-center gap-1">
//                                         {/* Name: Used 'text-secondary' (Dark Grey) for strong contrast */}
//                                         <h1 className="text-xl font-bold text-secondary leading-tight">
//                                             {item.name}
//                                         </h1>
//                                         {/* ID: Styled as a subtle caption */}
//                                         <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
//                                             ID: {item.productID}
//                                         </span>
//                                     </div>

//                                     {/* Changed: Quantity Controls
//                                         - Removed 'bg-yellow'.
//                                         - Aligned vertically with a clean look.
//                                         - Icons use 'text-accent' (Orange) to match your theme highlights.
//                                     */}
//                                     <div className="flex flex-col items-center justify-center gap-1 min-w-[50px]">
//                                         <CiCircleChevUp 
//                                             className="text-3xl text-accent cursor-pointer hover:text-orange-600 transition-transform active:scale-90"
//                                             title="Increase quantity"
//                                             onClick={
//                                                 () => {
//                                                         const newCart = [...cart];
//                                                         newCart[index].quantity += 1;
//                                                         setCart(newCart);
//                                                     }
//                                                 }
//                                         />
                                        
//                                         <span className="text-lg font-bold text-secondary tabular-nums">
//                                             {item.quantity}
//                                         </span>
                                        
//                                         <CiCircleChevDown 
//                                             className="text-3xl text-accent cursor-pointer hover:text-orange-600 transition-transform active:scale-90"
//                                             title="Decrease quantity"
//                                             onClick={
//                                                 () => {
//                                                         const newCart = [...cart];
//                                                         if (newCart[index].quantity > 1) {
//                                                         newCart[index].quantity -= 1;
//                                                         setCart(newCart);
//                                                         }
//                                                     }
//                                                 }
//                                         />
//                                     </div>

//                                     <div className="w-[180px] h-full flex flex-col justify-center items-center">
//                                         {
//                                             item.labelledPrice>item.price&&
//                                             <span className="text-secondary text-lg text-right pr-[10px] mt-[20px] line-through">LKR: {item.labelledPrice.toFixed(2)}</span>
//                                         }
//                                         <span className="text-accent text-2xl font-semibold text-right pr-[10px] mt-2 flex">LKR: {item.price.toFixed(2)}</span>
//                                     </div>
//                                 </div>
//                             )
//                         })
//                     }
//                     <div className="w-full flex items-center p-6 gap-6 hover:bg-gray-50 transition-colors flex justify-end items-center relative">
//                         <button to="/checkout" className="absolute left-6 bg-accent text-white font-semibold hover:bg-orange-600 px-4 py-2 rounded-full">
//                             Order
//                         </button>
//                         <div className="h-[50px]">
//                             <span className="w-full text-accent text-2xl font-semibold text-right pr-[10px] mt-2 flex justify-end items-center">Total: LKR {getTotal().toFixed(2)}</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }



// Above is the previous code. Below is the updated code.





import React, { useEffect, useState } from "react";
// import { addToCart, getTotal, loadCart } from "../utilities/cart.js";
import { CiCircleChevDown } from "react-icons/ci";
import { CiCircleChevUp } from "react-icons/ci";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";


export default function checkoutPage() {

    const location = useLocation();
    const navigate = useNavigate();

    /**
     * State Initialization
     * Initializes cart state from navigation state (location.state),
     * falls back to loadCart() utility, or defaults to an empty array.
     */
    const [cart, setCart] = React.useState(location.state || loadCart() || []);

    /**
     * Calculates the total cost of the cart.
     * Iterates through the cart array and sums (price * quantity).
     * @returns {number} - The total checkout value.
     */
    function getTotal() {
        let total = 0;
        cart.forEach((item) => {
            total += item.price * item.quantity;
        });
        return total;
    }

    async function purchaseCart() {
        const token = localStorage.getItem("token");
        if (token != null) {
            toast.error("Please login to make a purchase.");
            navigate("/login");
            return;
        }

        try {
            const items = [];
            for(let i=0; i<cart.length; i++) {
                items.push({
                    productID: cart[i].productID,
                    quantity: cart[i].quantity,
                });
            }
            const response = await axios.post(import.meta.env.VITE_API_URL + "/api/orders",{
                address : "123, Sample Street, City, Country",
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        }catch (error) {
            toast.error("An error occurred while processing your purchase.");
        }
    }

    return (
        /* * Main Page Container 
         * Full screen width/height with primary background color.
         * centered items vertically and horizontally with padding.
         */
        <div className="w-full min-h-screen bg-primary flex flex-col items-center py-10">

            {/* Page Header Section */}
            <div className="text-center mb-8">
                <h1 className="font-serif text-4xl md:text-5xl">
                    <span className="font-bold text-secondary">Your </span>
                    <span className="italic font-bold text-accent">Checkout</span>
                </h1>
            </div>

            {/* * Cart Card Container
             * Responsive width (max-3xl), white background, rounded corners, 
             * and shadow for depth. Overflow hidden ensures content respects corners.
             */}
            <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl flex flex-col overflow-hidden">

                {/* Scrollable List Container */}
                <div className="flex flex-col overflow-y-auto h-full max-h-[600px] divide-y divide-gray-100">
                    {
                        cart.map((item, index) => {
                            return (
                                /* Individual Cart Item Row */
                                <div 
                                    key={index} 
                                    className="w-full flex items-center p-6 gap-6 hover:bg-gray-50 transition-colors relative justify-center"
                                >

                                    {/* Delete Button (Trash Icon) - Absolute Positioned */}
                                    <button 
                                        className="absolute top-2 right-2 text-red-500 font-bold text-2xl rounded-full aspect-square hover:bg-red-500 p-[5px] transition hover:text-white hover:scale-110"
                                        onClick={() => {
                                            // Logic to remove item goes here
                                        }}
                                    >
                                        <BiTrash />
                                    </button>

                                    {/* Product Image */}
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0 border border-gray-200 shadow-sm"
                                    />

                                    {/* Product Details (Name & ID) */}
                                    <div className="flex-1 flex flex-col justify-center gap-1">
                                        <h1 className="text-xl font-bold text-secondary leading-tight">
                                            {item.name}
                                        </h1>
                                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                                            ID: {item.productID}
                                        </span>
                                    </div>

                                    {/* Quantity Controls (Up/Down Arrows & Count) */}
                                    <div className="flex flex-col items-center justify-center gap-1 min-w-[50px]">
                                        
                                        {/* Increase Quantity Button */}
                                        <CiCircleChevUp
                                            className="text-3xl text-accent cursor-pointer hover:text-orange-600 transition-transform active:scale-90"
                                            title="Increase quantity"
                                            onClick={() => {
                                                const newCart = [...cart];
                                                newCart[index].quantity += 1;
                                                setCart(newCart);
                                            }}
                                        />

                                        {/* Current Quantity Display */}
                                        <span className="text-lg font-bold text-secondary tabular-nums">
                                            {item.quantity}
                                        </span>

                                        {/* Decrease Quantity Button */}
                                        <CiCircleChevDown
                                            className="text-3xl text-accent cursor-pointer hover:text-orange-600 transition-transform active:scale-90"
                                            title="Decrease quantity"
                                            onClick={() => {
                                                const newCart = [...cart];
                                                if (newCart[index].quantity > 1) {
                                                    newCart[index].quantity -= 1;
                                                    setCart(newCart);
                                                }
                                            }}
                                        />
                                    </div>

                                    {/* Price Display Section */}
                                    <div className="w-[180px] h-full flex flex-col justify-center items-center">
                                        {/* Conditional rendering for discounted/original price */}
                                        {item.labelledPrice > item.price && (
                                            <span className="text-secondary text-lg text-right pr-[10px] mt-[20px] line-through">
                                                LKR: {item.labelledPrice.toFixed(2)}
                                            </span>
                                        )}
                                        {/* Final Price */}
                                        <span className="text-accent text-2xl font-semibold text-right pr-[10px] mt-2 flex">
                                            LKR: {item.price.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    }

                    {/* Footer Row: Order Button & Total Calculation */}
                    <div className="w-full flex items-center p-6 gap-6 hover:bg-gray-50 transition-colors justify-end relative">
                        
                        {/* Order Button */}
                        <button
                            onClick={purchaseCart}
                            to="/checkout" 
                            className="absolute left-6 bg-accent text-white font-semibold hover:bg-orange-600 px-4 py-2 rounded-full"
                        >
                            Order
                        </button>

                        {/* Total Price Display */}
                        <div className="h-[50px]">
                            <span className="w-full text-accent text-2xl font-semibold text-right pr-[10px] mt-2 flex justify-end items-center">
                                Total: LKR {getTotal().toFixed(2)}
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}