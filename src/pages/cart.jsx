import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { BiTrash } from "react-icons/bi";
import { addToCart, getTotal, loadCart } from "../utilities/cart.js";

/**
 * CartPage Component
 * =============================================================================
 * This component renders the user's shopping cart.
 * * Functionality:
 * 1. Loads cart data from a utility function (likely LocalStorage).
 * 2. Displays items in a responsive list format.
 * 3. Provides controls to increase, decrease, or remove items.
 * 4. Calculates and displays the subtotal and grand total.
 * 5. Provides navigation to the Checkout page.
 * =============================================================================
 */
export default function cartPage() {
    
    // State Initialization:
    // 'cart' holds the array of product objects currently selected by the user.
    // We initialize it immediately by calling the 'loadCart' utility.
    const [cart, setCart] = React.useState(loadCart());

    return (
        /* Main Container
           ---------------------------------------------------------------------
           - w-full min-h-screen: Ensures the background covers the entire viewport.
           - bg-primary: Applies the application's cream theme color.
           - flex-col items-center: Centers the content column horizontally.
        */
        <div className="w-full min-h-screen bg-primary flex flex-col items-center py-10">
            
            {/* Header Section
               -----------------------------------------------------------------
               Displays the page title using mixed typography styling (Serif/Sans)
               to distinguish "Your" from "Shopping Cart".
            */}
            <div className="text-center mb-8">
                <h1 className="font-serif text-4xl md:text-5xl">
                    <span className="font-bold text-secondary">Your </span>
                    <span className="italic font-bold text-accent">Shopping Cart</span>
                </h1>
            </div>

            {/* Cart Card Container
               -----------------------------------------------------------------
               A white, elevated card that contains the list of items.
               - max-w-3xl: Restricts width on large screens for readability.
               - overflow-hidden: Ensures rounded corners clip the content.
            */}
            <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl flex flex-col overflow-hidden">
                
                {/* Scrollable List Area: Handles vertical overflow if the cart is long */}
                <div className="flex flex-col overflow-y-auto h-full max-h-[600px] divide-y divide-gray-100">
                    {
                        /* Iterate through the cart array to render each product row.
                           'item' represents the specific product object.
                           'index' provides a unique key for React rendering.
                        */
                        cart.map((item, index) => {
                            return (
                                <div key={index} className="w-full flex items-center p-6 gap-6 hover:bg-gray-50 transition-colors relative items-center justify-center">

                                    {/* Delete Button
                                       ---------------------------------------------
                                       Positioned absolutely to the top-right.
                                       
                                       Function Step-by-Step:
                                       1. User clicks the Trash icon.
                                       2. addToCart is called with negative quantity equal to current quantity.
                                          This effectively reduces the count to 0, removing it from the utility.
                                       3. setCart(loadCart()) triggers a re-render with the updated list.
                                    */}
                                    <button 
                                        className="absolute top-2 right-2 text-red-500 font-bold right-[-50px] text-2xl rounded-full aspect-square hover:bg-red-500 p-[5px] transition hover:text-white hover:scale-110"
                                        onClick={() => {
                                            addToCart(item, -item.quantity);
                                            setCart(loadCart());
                                        }}
                                    >
                                        <BiTrash></BiTrash>
                                    </button>

                                    {/* Product Image: Fixed dimensions to prevent layout shifts */}
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0 border border-gray-200 shadow-sm"
                                    />

                                    {/* Product Meta Data: Name and ID */}
                                    <div className="flex-1 flex flex-col justify-center gap-1">
                                        <h1 className="text-xl font-bold text-secondary leading-tight">
                                            {item.name}
                                        </h1>
                                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                                            ID: {item.productID}
                                        </span>
                                    </div>

                                    {/* Quantity Controls
                                       ---------------------------------------------
                                       Allows the user to increment or decrement the specific item count.
                                    */}
                                    <div className="flex flex-col items-center justify-center gap-1 min-w-[50px]">
                                        {/* Increment Button */}
                                        <CiCircleChevUp 
                                            className="text-3xl text-accent cursor-pointer hover:text-orange-600 transition-transform active:scale-90"
                                            title="Increase quantity"
                                            onClick={() => {
                                                addToCart(item, 1);
                                                setCart(loadCart());
                                            }}
                                        />
                                        
                                        {/* Current Quantity Display */}
                                        <span className="text-lg font-bold text-secondary tabular-nums">
                                            {item.quantity}
                                        </span>
                                        
                                        {/* Decrement Button */}
                                        <CiCircleChevDown 
                                            className="text-3xl text-accent cursor-pointer hover:text-orange-600 transition-transform active:scale-90"
                                            title="Decrease quantity"
                                            onClick={() => {
                                                addToCart(item, -1);
                                                setCart(loadCart());
                                            }}
                                        />
                                    </div>

                                    {/* Price Section
                                       ---------------------------------------------
                                       Displays the item price.
                                       Conditionally renders a strikethrough price if a discount is applied.
                                    */}
                                    <div className="w-[180px] h-full flex flex-col justify-center items-center">
                                        {
                                            item.labelledPrice > item.price &&
                                            <span className="text-secondary text-lg text-right pr-[10px] mt-[20px] line-through">
                                                LKR: {item.labelledPrice.toFixed(2)}
                                            </span>
                                        }
                                        <span className="text-accent text-2xl font-semibold text-right pr-[10px] mt-2 flex">
                                            LKR: {item.price.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                    }

                    {/* Footer Section
                       ---------------------------------------------------------
                       Contains the Grand Total calculation and the Checkout navigation.
                    */}
                    <div className="w-full flex items-center p-6 gap-6 hover:bg-gray-50 transition-colors flex justify-end items-center relative">
                        {/* Checkout Link:
                           Passes the current 'cart' state to the checkout route via the 'state' prop.
                        */}
                        <Link 
                            state={cart} 
                            to="/checkout" 
                            className="absolute left-6 bg-accent text-white font-semibold hover:bg-orange-600 px-4 py-2 rounded-full"
                        >
                            Proceed to Checkout
                        </Link>
                        
                        {/* Total Calculation Display */}
                        <div className="h-[50px]">
                            <span className="w-full text-accent text-2xl font-semibold text-right pr-[10px] mt-2 flex justify-end items-center">
                                Total: LKR {getTotal().toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}