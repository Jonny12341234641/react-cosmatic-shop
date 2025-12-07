import { use, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import axios from "axios";
import mediaUpload from "../../utilities/mediaUpload.jsx";
import toast from "react-hot-toast";



export default function UpdateProductPage() {
    // Corrected initialization to "" (strings) instead of {} (objects) 
    // so the inputs don't display "[object Object]"
    const location = useLocation();

    const [productID, setProductID] = useState(location.state.productID);
    const [name, setName] = useState(location.state.name);
    const [altNames, setAltNames] = useState(location.state.altNames);
    const [description, setDescription] = useState(location.state.description);
    const [price, setPrice] = useState(location.state.price);
    const [labelledPrice, setLabelledPrice] = useState(location.state.labelledPrice);
    const [category, setCategory] = useState(location.state.category); // Default to first option
    const [images, setImages] = useState({});
    const [stock, setStock] = useState(location.state.stock);
    const navigate = useNavigate();

async function updateProduct(){
        const token = localStorage.getItem("token");
        if(token == null){
            navigate("/login");
            return
        }

        const promises = []

        for(let i = 0; i < images.length; i++){
            console.log(images[i]);
            promises[i] = mediaUpload(images[i]);
        }

        // 1. Declare variable here
        let urls = [];

        try{
            // 2. Remove 'const' here. Update the outer variable.
            let urls = await Promise.all(promises);

            if(urls.length === 0){
                urls = location.state.images;
            }
            
            // const alternativeNames = altNames.split(",");

            const uploadResolves = await Promise.all(promises);

            // 2. FIX: Extract just the 'publicUrl' string from each response object
            urls = uploadResolves.map((response) => response.data.publicUrl);

            const alternativeNames = altNames.split(",");

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
            }

            // 3. FIX: Add the space after Bearer
            await axios.post(import.meta.env.VITE_API_URL + "/api/products"+"/"+productID, product, {
                headers : {
                    "Authorization" : "Bearer " + token 
                }
            })
            toast.success("Product updated successfully!");
            navigate("/admin/products"); // Optional: Redirect after success
        }catch(error){
            console.log(error) // Log the error to see details
            const serverMessage = error.response?.data?.message || "Error updating product";
            toast.error("Error updating product");
        }

        console.log(urls);
    }

    // Reusable styles for inputs to keep JSX clean
    const inputStyle = "w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-secondary placeholder-gray-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 font-['Montserrat']";
    const labelStyle = "block text-sm font-semibold text-secondary mb-2 font-['Montserrat']";

    return (
        <div className="min-h-screen w-full flex justify-center items-center bg-primary p-6">
            <div className="w-full max-w-3xl bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl border-t-4 border-accent overflow-hidden">
                
                {/* Header Section */}
                <div className="bg-secondary p-6 text-center">
                    <h2 className="text-3xl font-bold text-primary font-['Playfair_Display'] tracking-wide">
                        Update New Product
                    </h2>
                    <p className="text-gray-400 text-sm mt-2 font-['Montserrat']">
                        Enter the details to update your inventory
                    </p>
                </div>

                {/* Form Section */}
                <div className="p-8 space-y-6">
                    
                    {/* Row 1: ID and Name */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="col-span-1">
                            <label className={labelStyle}>Product ID</label>
                            <input
                                disabled
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

                    {/* Row 2: Alt Names */}
                    <div>
                        <label className={labelStyle}>Alternative Names (Keywords)</label>
                        <input 
                            className={inputStyle} 
                            placeholder="e.g. moisturizer, night cream, skin repair"
                            value={altNames} 
                            onChange={(e) => setAltNames(e.target.value)} 
                        />
                    </div>

                    {/* Row 3: Description */}
                    <div>
                        <label className={labelStyle}>Description</label>
                        <textarea 
                            className={`${inputStyle} h-32 resize-none`} 
                            placeholder="Detailed product description..."
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                        />
                    </div>

                    {/* Row 4: Pricing */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                    {/* Row 5: Category, Stock, Image */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Category */}
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

                        {/* Stock */}
                        <div>
                            <label className={labelStyle}>Stock Quantity</label>
                            <input 
                                type="number"
                                className={inputStyle} 
                                value={stock} 
                                onChange={(e) => setStock(e.target.value)} 
                            />
                        </div>

                        {/* Image Upload */}
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
                            {images.length > 0 && (
                                <p className="text-xs text-accent mt-1 text-center font-medium">
                                    {images.length} files selected
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Action (Optional Visual Only) */}
                <div onClick={()=>{
                    navigate("/admin/products")
                }} className="bg-gray-50 px-8 py-4 flex justify-end border-t border-gray-100 flex justify-center items-center-safe gap-2">
                    <button className="bg-primary text-secondary font-['Montserrat'] font-semibold py-2 px-8 rounded-full hover:bg-red-500 hover:shadow-lg transition-all transform active:scale-95 flex justify-center items-center">
                        Cancel
                    </button>
                     <button onClick={updateProduct} className="bg-accent text-primary font-['Montserrat'] font-semibold py-2 px-8 rounded-full hover:bg-[#e57020] hover:shadow-lg transition-all transform active:scale-95 flex justify-center items-center">
                        Update Product
                    </button>
                </div>

            </div>
        </div>
    );
}