import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { BiTrash } from "react-icons/bi";
import toast from "react-hot-toast";
import axios from "axios";
import { loadCart } from "../utilities/cart";

/**
 * CheckoutPage Component
 * =============================================================================
 * Handles the final step of the e-commerce flow.
 * * Functional Overview:
 * 1. State Management: Retrieves cart data from Router state or LocalStorage.
 * 2. Financial Calculation: Computes the total order value dynamically.
 * 3. API Integration: Constructs the order payload and submits it to the backend.
 * 4. Authentication Guard: Ensures only logged-in users can place orders.
 * =============================================================================
 */
export default function checkoutPage() {

    // Hooks for routing and navigation control
    const location = useLocation();
    const navigate = useNavigate();

    /**
     * Cart State Initialization
     * -------------------------------------------------------------------------
     * Hierarchy of data sources:
     * 1. location.state: Data passed directly from the Cart Page via Link.
     * 2. loadCart(): Fallback to LocalStorage utility if direct state is missing.
     * 3. []: Default to an empty array to prevent render crashes.
     */
    const [cart, setCart] = React.useState(location.state || loadCart() || []);

    /**
     * getTotal Helper Function
     * -------------------------------------------------------------------------
     * Iterates through the cart array to calculate the grand total.
     * Formula: Sum(Item Price * Item Quantity)
     * @returns {number} The total cost of the order.
     */
    function getTotal() {
        let total = 0;
        cart.forEach((item) => {
            total += item.price * item.quantity;
        });
        return total;
    }

    /**
     * purchaseCart Asynchronous Handler
     * -------------------------------------------------------------------------
     * Manages the checkout process.
     * * Steps:
     * 1. Auth Check: Verifies existence of a JWT token. Redirects to login if missing.
     * 2. Payload Construction: Maps the cart state to the backend-expected format.
     * 3. API Request: Sends POST request to /api/orders with Bearer token.
     * 4. Error Handling: Manages 401 (Unauthorized), 400 (Bad Request), and generic errors.
     */
    async function purchaseCart() {
        const token = localStorage.getItem("token");
        
        // Step 1: Pre-flight Authentication Check
        if (token == null) {
            toast.error("Please login to make a purchase.");
            // Pass the current path in state to redirect back after login
            navigate("/login", { state: { from: "/checkout" } });
            return;
        }

        try {
            // Step 2: Transform cart state into OrderItem schema
            const items = cart.map(item => ({
                productID: item.productID,
                quantity: item.quantity,
            }));

            // Step 3: Execute API Call
            await axios.post(import.meta.env.VITE_API_URL + "/api/orders", {
                items: items,
                address: "123, Sample Street, City, Country",
                phone: "0712345678"
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Step 4: Success Handling
            toast.success("Order placed successfully");
            setCart([]); // Clear local state
            navigate("/"); // Redirect to Home

        } catch (error) {
            console.log(error);
            toast.error("An error occurred while processing your purchase.");

            // Step 5: Granular Error Handling
            if (error.response) {
                // Scenario: Token expired or invalid
                if (error.response.status === 401) {
                    toast.error("Please login to continue.");
                    navigate("/login", { state: { from: "/checkout" } });
                } 
                // Scenario: Business logic validation failure (e.g., Out of Stock)
                else if (error.response.status === 400) {
                    toast.error(error.response.data.message);
                } 
                // Scenario: Server-side failure
                else {
                    toast.error("Server error. Please try again later.");
                }
            } else {
                // Scenario: Network failure
                toast.error("Network error. Please check your connection.");
            }
        }
    }

    return (
        /* Main Layout Container: 
           Uses 'bg-primary' for theme consistency and flex-col for vertical alignment. 
        */
        <div className="w-full min-h-screen bg-primary flex flex-col items-center py-10">

            {/* Header Section: Typography styling for branding */}
            <div className="text-center mb-8">
                <h1 className="font-serif text-4xl md:text-5xl">
                    <span className="font-bold text-secondary">Your </span>
                    <span className="italic font-bold text-accent">Checkout</span>
                </h1>
            </div>

            {/* Card Container: 
               Hosts the cart list. Styled with shadow and rounded corners for a modern look.
            */}
            <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl flex flex-col overflow-hidden">

                {/* Scrollable List Area: Ensures layout stability with large item counts */}
                <div className="flex flex-col overflow-y-auto h-full max-h-[600px] divide-y divide-gray-100">
                    {
                        cart.map((item, index) => {
                            return (
                                /* Individual Cart Item Row */
                                <div 
                                    key={index} 
                                    className="w-full flex items-center p-6 gap-6 hover:bg-gray-50 transition-colors relative justify-center"
                                >

                                    {/* Delete Item Action (Placeholder Logic) */}
                                    <button 
                                        className="absolute top-2 right-2 text-red-500 font-bold text-2xl rounded-full aspect-square hover:bg-red-500 p-[5px] transition hover:text-white hover:scale-110"
                                        onClick={() => {
                                            // TODO: Implement removeItem logic here if needed locally
                                        }}
                                    >
                                        <BiTrash />
                                    </button>

                                    {/* Product Thumbnail */}
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0 border border-gray-200 shadow-sm"
                                    />

                                    {/* Item Info: Name and ID */}
                                    <div className="flex-1 flex flex-col justify-center gap-1">
                                        <h1 className="text-xl font-bold text-secondary leading-tight">
                                            {item.name}
                                        </h1>
                                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                                            ID: {item.productID}
                                        </span>
                                    </div>

                                    {/* Quantity Management Controls */}
                                    <div className="flex flex-col items-center justify-center gap-1 min-w-[50px]">
                                        
                                        {/* Increment Action */}
                                        <CiCircleChevUp
                                            className="text-3xl text-accent cursor-pointer hover:text-orange-600 transition-transform active:scale-90"
                                            title="Increase quantity"
                                            onClick={() => {
                                                const newCart = [...cart];
                                                newCart[index].quantity += 1;
                                                setCart(newCart);
                                            }}
                                        />

                                        {/* Quantity Display */}
                                        <span className="text-lg font-bold text-secondary tabular-nums">
                                            {item.quantity}
                                        </span>

                                        {/* Decrement Action */}
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

                                    {/* Pricing Display */}
                                    <div className="w-[180px] h-full flex flex-col justify-center items-center">
                                        {/* Discount Logic: Strikethrough labelled price if higher than selling price */}
                                        {item.labelledPrice > item.price && (
                                            <span className="text-secondary text-lg text-right pr-[10px] mt-[20px] line-through">
                                                LKR: {item.labelledPrice.toFixed(2)}
                                            </span>
                                        )}
                                        {/* Selling Price */}
                                        <span className="text-accent text-2xl font-semibold text-right pr-[10px] mt-2 flex">
                                            LKR: {item.price.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    }

                    {/* Footer Section: Action Buttons and Final Calculation */}
                    <div className="w-full flex items-center p-6 gap-6 hover:bg-gray-50 transition-colors justify-end relative">
                        
                        {/* Final Order Submission Button */}
                        <button
                            onClick={purchaseCart}
                            className="absolute left-6 bg-accent text-white font-semibold hover:bg-orange-600 px-4 py-2 rounded-full"
                        >
                            Order
                        </button>

                        {/* Grand Total Display */}
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