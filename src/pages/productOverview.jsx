import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../components/loader";
import ImageSlider from "../components/imageSlider";
import { loadCart, addToCart } from "../utilities/cart";

/**
 * ProductOverview Component
 * =============================================================================
 * This component renders the detailed view for a single product.
 * * Functional Overview:
 * 1. URL Parameter: Extracts the product ID from the route parameters.
 * 2. Data Fetching: Retrieves specific product details from the backend API.
 * 3. State Management: Handles three UI states: 'loading', 'loaded', and 'error'.
 * 4. User Interactions: Allows adding the item to the cart or proceeding directly 
 * to checkout via the "Buy Now" action.
 * =============================================================================
 */
export default function ProductOverview() {

    // Retrieve the dynamic 'id' parameter from the URL (e.g., /overview/123)
    const params = useParams();

    // State Initialization:
    // 'status': Tracks the current phase of the network request (loading -> loaded/error).
    // 'product': Stores the product object received from the API.
    const [status, setStatus] = React.useState("loading");
    const [product, setProduct] = React.useState(null);

    /**
     * Effect: Fetch Product Details
     * -------------------------------------------------------------------------
     * Runs once on component mount.
     * 1. Sends a GET request to the product API endpoint using the ID from params.
     * 2. On Success: Updates the 'product' state, sets status to 'loaded', and shows a toast.
     * 3. On Failure: Logs the error, sets status to 'error', and shows an error toast.
     */
    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + "/api/products/" + params.id).then((res) => {
            setProduct(res.data);
            console.log(res.data);
            setStatus("loaded");
            toast.success("Product details loaded");
        }).catch((err) => {
            toast.error("Error fetching product details");
            console.log(err);
            setStatus("error");
        });
    }, []);

    return (
        /* Main Container: 
           Calculates height to fill the screen minus the header (100vh - 100px).
           Sets default text color to secondary theme color.
        */
        <div className="w-full h-[calc(100vh-100px)] text-secondary">
            
            {/* Conditional Render: Loading State */}
            {
                status === "loading" && <Loader></Loader>
            }
            
            {/* Conditional Render: Success State */}
            {
                status === "loaded" && (
                    <div className="w-full h-full flex items-center justify-center">
                        
                        {/* Left Column: Image Gallery 
                            Passes the array of image URLs to the ImageSlider component.
                        */}
                        <div className="w-[50%] h-full flex items-center justify-center">
                            <ImageSlider images={product.images}>
                            </ImageSlider>
                        </div>
                        
                        {/* Right Column: Product Details */}
                        <div className="w-[50%] h-full flex flex-col items-center gap-4 p-10 ">
                            
                            {/* Product ID Badge */}
                            <span className="">{product.productID}</span>
                            
                            {/* Product Title & Alt Names
                                Renders the main name and iterates through alternative names (tags)
                                to display them alongside.
                            */}
                            <h1 className="text-2xl font-['Playfair_Display'] font-bold text-center">{product.name}
                                {
                                    product.altNames.map(
                                        (altName, index) => {
                                            return (
                                                <span key={index} className="text-sm font-['Playfair_Display'] font-normal">  {" | " + altName} </span>
                                            )
                                        }
                                    )
                                }
                            </h1>
                            
                            {/* Description Text */}
                            <p className="mt-[30px] text-lg font-['Montserrat'] text-justify">{product.description}</p>
                            
                            {/* Category Label (pushed to bottom of available space via mt-auto if needed) */}
                            <span className="mt-auto text-md font-['Montserrat']">Category: {product.category}</span>
                            
                            {/* Price Display Logic:
                                Checks if 'labelledPrice' (MSRP) is greater than the selling 'price'.
                                If true, displays both prices to show the discount (strikethrough).
                                If false, displays only the selling price.
                            */}
                            {
                                product.labelledPrice > product.price ?
                                <div className="flex items-center gap-4">
                                    <span className="text-3xl font-['Playfair_Display'] font-bold text-accent">${product.labelledPrice.toFixed(2)}</span>
                                    <span className="text-xl font-['Montserrat'] line-through text-gray-500">${product.price.toFixed(2)}</span>
                                </div>
                                :
                                <span className="text-3xl font-['Playfair_Display'] font-bold text-accent">${product.price.toFixed(2)}</span>
                            }

                            {/* Action Buttons Container */}
                            <div className="w-full h-[40px] flex gap-4">
                                
                                {/* Add to Cart Button 
                                    - Logs current cart state.
                                    - Adds 1 unit of the product to the cart utility.
                                    - Displays success feedback.
                                */}
                                <button 
                                    onClick={() => {
                                        console.log(loadCart(product));
                                        addToCart(product, 1);
                                        toast.success("Added " + product.name + " to cart");
                                    }}
                                    className="w-full h-full bg-accent text-white font-['Montserrat'] font-bold rounded hover:bg-transparent hover:border-2 hover:border-dark transition hover:text-black">
                                    Add to Cart
                                </button>
                                
                                {/* Buy Now Button (Link)
                                    - Navigates directly to /checkout.
                                    - Passes the current product as a single-item array in 'state'.
                                    - Allows immediate purchase without using the global cart.
                                */}
                                <Link
                                    to="/checkout"
                                    state={[{
                                        images: product.images,
                                        name: product.name,
                                        price: product.price,
                                        productID: product.productID,
                                        labelledPrice: product.labelledPrice,
                                        quantity: 1
                                    }]} 
                                    onClick={() => {
                                        console.log(loadCart(product));
                                        toast.success("Buying " + product.name);
                                    }}
                                    className="w-full h-full border-2 border-accent text-accent font-['Montserrat'] font-bold rounded hover:bg-accent hover:text-white transition">
                                    Buy Now
                                </Link>
                            </div>

                        </div>
                    </div>
                )
            }
            
            {/* Conditional Render: Error State */}
            {
                status === "error" && 
                <div className="w-full min-h-screen flex items-center justify-center text-3xl text-red-500">
                    <h1>Error fetching product details</h1>
                </div>
            }
        </div>
    );
}