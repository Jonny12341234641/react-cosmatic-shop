import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import mediaUpload from "../../utilities/mediaUpload.jsx";
import toast from "react-hot-toast";

/**
 * UpdateProductPage Component
 * =============================================================================
 * A form interface that allows administrators to modify existing product details.
 * * Functional Overview:
 * 1. Data Retrieval: Receives existing product data via React Router's 'location.state'.
 * 2. State Initialization: Pre-fills all form fields with the received data.
 * 3. Media Handling: Allows uploading new images to replace the existing set.
 * 4. API Interaction: Sends a PUT request to update the product resource on the backend.
 * =============================================================================
 */
export default function UpdateProductPage() {
  
  // Hooks for navigation and accessing route state
  const location = useLocation();
  const navigate = useNavigate();

  // State Management:
  // We initialize the local state using the data passed from the product list page.
  // This ensures the form is pre-filled with the current values.
  
  const [productID, setProductID] = useState(location.state.productID);
  const [name, setName] = useState(location.state.name);
  
  // Transformation:
  // 'altNames' is stored as an array in the DB but needs to be a comma-separated string 
  // for the text input field. We join it here.
  const [altNames, setAltNames] = useState(location.state.altNames.join(",")); 
  
  const [description, setDescription] = useState(location.state.description);
  const [price, setPrice] = useState(location.state.price);
  const [labelledPrice, setLabelledPrice] = useState(location.state.labelledPrice);
  const [category, setCategory] = useState(location.state.category);
  const [stock, setStock] = useState(location.state.stock);
  
  // State for handling NEW file uploads only.
  // If this remains empty, the original images are preserved.
  const [newImages, setNewImages] = useState([]); 

  /**
   * updateProduct Function
   * ---------------------------------------------------------------------------
   * Asynchronous handler to process form submission and update the product.
   * * Steps:
   * 1. Authentication: Verifies the user token exists.
   * 2. Image Logic: 
   * - Defaults to keeping the existing images (`location.state.images`).
   * - If `newImages` are selected, uploads them to the cloud and uses the new URLs.
   * 3. Data Formatting: Converts the comma-separated `altNames` string back into an array.
   * 4. API Request: Sends a PUT request with the updated payload.
   * 5. Feedback: Displays success/error toasts and redirects on success.
   * ---------------------------------------------------------------------------
   */
  async function updateProduct(){
    // Step 1: Check Authentication
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/login");
      return;
    }

    // Step 2: Determine which Image URLs to use
    let finalUrls = location.state.images; // Default: Keep OLD images

    try {
      // If new images were selected in the file input, upload them now
      if (newImages.length > 0) {
        const promises = [];
        
        // Queue upload promises for all selected files
        for(let i = 0; i < newImages.length; i++){
          promises.push(mediaUpload(newImages[i]));
        }
        
        // Wait for all uploads to complete
        const uploadResolves = await Promise.all(promises);
        
        // Extract the public URLs from the response
        finalUrls = uploadResolves.map((response) => response.data.publicUrl);
      }

      // Step 3: Format Data
      // Convert the input string "tag1,tag2" back to array ["tag1", "tag2"]
      const formattedAltNames = altNames.split(",");

      // Construct the payload object
      const product = {
        productID : productID,
        name : name,
        altNames : formattedAltNames,
        images : finalUrls, // Uses either the old URLs or the newly uploaded ones
        description : description,
        price : price,
        labelledPrice : labelledPrice,
        category : category,
        stock : stock
      };

      // Step 4: Send PUT Request
      await axios.put(import.meta.env.VITE_API_URL + "/api/products/" + productID, product, {
        headers : {
          "Authorization" : "Bearer " + token 
        }
      });

      // Step 5: Handle Success
      toast.success("Product updated successfully!");
      navigate("/admin/products");

    } catch(error){
      // Step 6: Handle Errors
      console.log(error);
      toast.error("Error updating product");
    }
  }

  // Reusable styling constants for consistent UI
  const inputStyle = "w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-secondary placeholder-gray-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 font-['Montserrat']";
  const labelStyle = "block text-sm font-semibold text-secondary mb-2 font-['Montserrat']";

  return (
    // Main Container: Full screen height with primary background
    <div className="min-h-screen w-full flex justify-center items-center bg-primary p-6">
      
      {/* Form Card */}
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl border-t-4 border-accent overflow-hidden">
        
        {/* --- Header Section --- */}
        <div className="bg-secondary p-6 text-center">
          <h2 className="text-3xl font-bold text-primary font-['Playfair_Display'] tracking-wide">Update Product</h2>
        </div>

        {/* --- Form Body --- */}
        <div className="p-8 space-y-6">
          
          {/* Row 1: Product ID (Disabled) and Name */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1">
              <label className={labelStyle}>Product ID</label>
              <input 
                disabled 
                className={inputStyle} 
                value={productID} 
                onChange={(e) => setProductID(e.target.value)} 
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className={labelStyle}>Product Name</label>
              <input 
                className={inputStyle} 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </div>
          </div>

          {/* Row 2: Alternative Names */}
          <div>
            <label className={labelStyle}>Alternative Names (Keywords)</label>
            <input 
              className={inputStyle} 
              value={altNames} 
              onChange={(e) => setAltNames(e.target.value)} 
            />
          </div>

          {/* Row 3: Description */}
          <div>
            <label className={labelStyle}>Description</label>
            <textarea 
              className={`${inputStyle} h-32 resize-none`} 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
            />
          </div>

          {/* Row 4: Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelStyle}>Selling Price</label>
              <input 
                type="number" 
                className={inputStyle} 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
              />
            </div>
            <div>
              <label className={labelStyle}>Labelled Price</label>
              <input 
                type="number" 
                className={inputStyle} 
                value={labelledPrice} 
                onChange={(e) => setLabelledPrice(e.target.value)} 
              />
            </div>
          </div>

          {/* Row 5: Metadata (Category, Stock, Images) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelStyle}>Category</label>
              <select 
                className={inputStyle} 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="cream">Cream</option>
                <option value="lotion">Lotion</option>
                <option value="serum">Serum</option>
              </select>
            </div>
            
            <div>
              <label className={labelStyle}>Stock</label>
              <input 
                type="number" 
                className={inputStyle} 
                value={stock} 
                onChange={(e) => setStock(e.target.value)} 
              />
            </div>
            
            <div>
              <label className={labelStyle}>Images</label>
              <input 
                type="file" 
                className={inputStyle} 
                onChange={(e) => setNewImages(e.target.files)} 
                multiple 
              />
            </div>
          </div>
        </div>

        {/* --- Footer Actions --- */}
        <div className="bg-gray-50 px-8 py-4 flex justify-center items-center-safe gap-2 border-t border-gray-100">
          <button 
            onClick={() => navigate("/admin/products")} 
            className="bg-primary text-secondary font-['Montserrat'] font-semibold py-2 px-8 rounded-full hover:bg-red-500 hover:shadow-lg transition-all transform active:scale-95 flex justify-center items-center"
          >
            Cancel
          </button>
          
          <button 
            onClick={updateProduct} 
            className="bg-accent text-primary font-['Montserrat'] font-semibold py-2 px-8 rounded-full hover:bg-[#e57020] hover:shadow-lg transition-all transform active:scale-95 flex justify-center items-center"
          >
            Update Product
          </button>
        </div>

      </div>
    </div>
  );
}