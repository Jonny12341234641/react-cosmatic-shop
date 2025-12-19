import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import mediaUpload from "../../utilities/mediaUpload.jsx";
import toast from "react-hot-toast";

/**
 * AddProductPage Component
 * =============================================================================
 * A comprehensive form interface for administrators to add new products to the inventory.
 * * Functional Capabilities:
 * 1. Manages local state for all product attributes (ID, Name, Price, Stock, etc.).
 * 2. Handles multi-file image uploads via an external utility.
 * 3. Aggregates form data and uploaded image URLs into a payload.
 * 4. Submits the payload to the backend API with secure authentication.
 * =============================================================================
 */
export default function AddProductPage() {
    
    // State Management:
    // Initializing state with empty strings ("") to ensure controlled inputs 
    // and prevent undefined or object rendering errors in the UI.
    const [productID, setProductID] = useState("");
    const [name, setName] = useState("");
    const [altNames, setAltNames] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [labelledPrice, setLabelledPrice] = useState("");
    const [category, setCategory] = useState("cream"); // Defaults to the first select option
    const [images, setImages] = useState([]);
    const [stock, setStock] = useState(0);
    
    // Navigation hook for redirecting the user after form submission
    const navigate = useNavigate();

    /**
     * addProduct Function
     * -------------------------------------------------------------------------
     * Asynchronous handler for the "Save Product" action.
     * * Steps:
     * 1. Authentication Check: Verifies if a user token exists. Redirects if missing.
     * 2. Image Processing: 
     * - Iterates through selected files.
     * - Uploads them concurrently using Promise.all for performance.
     * - Extracts the public URLs from the upload response.
     * 3. Data Formatting: Splits comma-separated keywords into an array.
     * 4. API Submission: Sends the constructed product object to the backend.
     * 5. Feedback: Displays success/error toasts and handles navigation.
     * -------------------------------------------------------------------------
     */
    async function addProduct(){
        // Step 1: Retrieve and validate authentication token
        const token = localStorage.getItem("token");
        if(token == null){
            navigate("/login");
            return;
        }

        // Step 2: Prepare image upload promises
        const promises = [];
        for(let i = 0; i < images.length; i++){
            console.log(images[i]);
            promises[i] = mediaUpload(images[i]);
        }

        let urls = [];

        try {
            // Step 3: Execute all upload promises concurrently
            const uploadResolves = await Promise.all(promises);

            // Step 4: Map the responses to extract only the public URL strings
            urls = uploadResolves.map((response) => response.data.publicUrl);

            // Step 5: Process the alternative names string into an array
            const alternativeNames = altNames.split(",");

            // Step 6: Construct the final product payload object
            const product = {
                productID : productID,
                name : name,
                altNames : alternativeNames,
                images : urls,
                description : description,
                price : price,
                labelledPrice : labelledPrice,
                category : category,
                stock : stock
            };

            // Step 7: Send POST request with Authorization header
            await axios.post(import.meta.env.VITE_API_URL + "/api/products", product, {
                headers : {
                    "Authorization" : "Bearer " + token 
                }
            });

            // Step 8: Handle success state
            toast.success("Product added successfully!");
            navigate("/admin/products"); 

        } catch(error) {
            // Step 9: Handle error state
            console.log(error);
            const serverMessage = error.response?.data?.message || "Error adding product";
            toast.error("Error adding product");
        }

        console.log(urls);
    }

    // Reusable Tailwind CSS classes for consistent input styling across the form
    const inputStyle = "w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-secondary placeholder-gray-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 font-['Montserrat']";
    const labelStyle = "block text-sm font-semibold text-secondary mb-2 font-['Montserrat']";

    return (
        <div className="min-h-screen w-full flex justify-center items-center bg-primary p-6">
            <div className="w-full max-w-3xl bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl border-t-4 border-accent overflow-hidden">
                
                {/* --- HEADER SECTION --- */}
                <div className="bg-secondary p-6 text-center">
                    <h2 className="text-3xl font-bold text-primary font-['Playfair_Display'] tracking-wide">
                        Add New Product
                    </h2>
                    <p className="text-gray-400 text-sm mt-2 font-['Montserrat']">
                        Enter the details to update your inventory
                    </p>
                </div>

                {/* --- FORM BODY SECTION --- */}
                <div className="p-8 space-y-6">
                    
                    {/* Row 1: Product ID and Name */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="col-span-1">
                            <label className={labelStyle}>Product ID</label>
                            <input 
                                className={inputStyle} 
                                placeholder="e.g. #SKU-1024"
                                value={productID} 
                                onChange={(e) => setProductID(e.target.value)} 
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <label className={labelStyle}>Product Name</label>
                            <input 
                                className={inputStyle} 
                                placeholder="e.g. Hydrating Face Cream"
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                            />
                        </div>
                    </div>

                    {/* Row 2: Alternative Names (Tags) */}
                    <div>
                        <label className={labelStyle}>Alternative Names (Keywords)</label>
                        <input 
                            className={inputStyle} 
                            placeholder="e.g. moisturizer, night cream, skin repair"
                            value={altNames} 
                            onChange={(e) => setAltNames(e.target.value)} 
                        />
                    </div>

                    {/* Row 3: Description Text Area */}
                    <div>
                        <label className={labelStyle}>Description</label>
                        <textarea 
                            className={`${inputStyle} h-32 resize-none`} 
                            placeholder="Detailed product description..."
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                        />
                    </div>

                    {/* Row 4: Pricing Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Selling Price */}
                        <div>
                            <label className={labelStyle}>Selling Price</label>
                            <div className="relative">
                                <span className="absolute left-4 top-3 text-secondary font-bold">$</span>
                                <input 
                                    type="number" 
                                    className={`${inputStyle} pl-8`} 
                                    placeholder="0.00"
                                    value={price} 
                                    onChange={(e) => setPrice(e.target.value)} 
                                />
                            </div>
                        </div>
                        {/* Labelled Price (MSRP) */}
                        <div>
                            <label className={labelStyle}>Labelled Price (MSRP)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-3 text-secondary font-bold">$</span>
                                <input 
                                    type="number" 
                                    className={`${inputStyle} pl-8`} 
                                    placeholder="0.00"
                                    value={labelledPrice} 
                                    onChange={(e) => setLabelledPrice(e.target.value)} 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Row 5: Metadata (Category, Stock, Image) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Category Dropdown */}
                        <div>
                            <label className={labelStyle}>Category</label>
                            <select 
                                className={`${inputStyle} cursor-pointer appearance-none`} 
                                value={category} 
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="cream">Cream</option>
                                <option value="lotion">Lotion</option>
                                <option value="serum">Serum</option>
                            </select>
                        </div>

                        {/* Stock Counter */}
                        <div>
                            <label className={labelStyle}>Stock Quantity</label>
                            <input 
                                type="number"
                                className={inputStyle} 
                                value={stock} 
                                onChange={(e) => setStock(e.target.value)} 
                            />
                        </div>

                        {/* File Upload Input */}
                        <div>
                            <label className={labelStyle}>Product Images</label>
                            <label className="flex flex-col items-center justify-center w-full h-[50px] border-2 border-dashed border-accent/50 rounded-lg cursor-pointer bg-primary/20 hover:bg-accent/10 transition-colors">
                                <span className="text-xs text-secondary font-['Montserrat'] font-medium">Click to Upload</span>
                                <input 
                                    type="file" 
                                    className="hidden" 
                                    onChange={(e) => setImages(e.target.files)} 
                                    multiple
                                />
                            </label>
                            {/* File Selection Indicator */}
                            {images.length > 0 && (
                                <p className="text-xs text-accent mt-1 text-center font-medium">
                                    {images.length} files selected
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- FOOTER ACTION SECTION --- */}
                {/* Note: The onClick handler here navigates to the products page, 
                    but specific buttons also have their own handlers.
                */}
                <div 
                    onClick={()=>{ navigate("/admin/products") }} 
                    className="bg-gray-50 px-8 py-4 flex justify-end border-t border-gray-100 flex justify-center items-center-safe gap-2"
                >
                    <button className="bg-primary text-secondary font-['Montserrat'] font-semibold py-2 px-8 rounded-full hover:bg-red-500 hover:shadow-lg transition-all transform active:scale-95 flex justify-center items-center">
                        Cancel
                    </button>
                    <button 
                        onClick={addProduct} 
                        className="bg-accent text-primary font-['Montserrat'] font-semibold py-2 px-8 rounded-full hover:bg-[#e57020] hover:shadow-lg transition-all transform active:scale-95 flex justify-center items-center"
                    >
                        Save Product
                    </button>
                </div>

            </div>
        </div>
    );
}