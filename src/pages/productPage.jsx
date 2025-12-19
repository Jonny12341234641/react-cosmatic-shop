import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../components/productCard";
import { Loader } from "../components/loader";
import { FiSearch, FiFilter } from "react-icons/fi"; 

/**
 * ProductPage Component
 * =============================================================================
 * The main catalog view for the e-commerce application.
 * * Functional Overview:
 * 1. Data Retrieval: Fetches the complete product inventory from the backend API.
 * 2. Search & Filter: Implements client-side filtering based on user input strings.
 * 3. Categorization: Segments products into specific groups (Cream, Lotion, Serum) for display.
 * 4. UI States: Manages Loading, Content, and Empty states dynamically.
 * =============================================================================
 */
export default function ProductPage() {
  
  // --- State Management ---
  
  // Stores the full list of products fetched from the server
  const [products, setProducts] = useState([]);
  
  // Controls the visibility of the loading spinner; defaults to true on mount
  const [loading, setLoading] = useState(true);
  
  // Captures the user's search input for real-time filtering
  const [query, setQuery] = useState("");

  /**
   * Effect: Initial Data Fetch
   * ---------------------------------------------------------------------------
   * Executes immediately when the component mounts.
   * * Steps:
   * 1. Sets 'loading' to true to display the spinner.
   * 2. Sends a GET request to the products API endpoint.
   * 3. On Success: Updates the 'products' state with the response data.
   * 4. On Error: Displays a toast notification and logs the issue.
   * 5. Finally: Sets 'loading' to false to reveal the UI.
   */
  useEffect(() => {
    setLoading(true);
    axios.get(import.meta.env.VITE_API_URL + "/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Error fetching products");
        setLoading(false);
      });
  }, []);

  /**
   * Filtering Logic
   * ---------------------------------------------------------------------------
   * Filters the master product list based on the search query.
   * Checks if the query string exists within the product's Name or Category.
   * * Note: Uses toLowerCase() for case-insensitive matching.
   */
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) || 
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  // Categorize the filtered results into specific groups for organized display
  const creams = filteredProducts.filter((p) => p.category === "cream");
  const lotions = filteredProducts.filter((p) => p.category === "lotion");
  const serums = filteredProducts.filter((p) => p.category === "serum");

  /**
   * renderProductSection Helper Function
   * ---------------------------------------------------------------------------
   * Renders a specific category section (e.g., "Creams").
   * * Logic:
   * 1. Checks if the category array has items. If empty, returns null (doesn't render).
   * 2. Renders a section header with the title.
   * 3. Maps through the items to render a responsive grid of ProductCards.
   * * @param {string} title - The display title for the section.
   * @param {Array} products - The array of product objects to display.
   */
  const renderProductSection = (title, products) => {
    if (products.length === 0) return null;

    return(
      <div className="mb-12">
        <h2 className="text-3xl font-['Playfair_Display'] font-bold text-secondary mb-6">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {products.map((item) => (
            <ProductCard
              key={item.productID}
              id={item.productID}
              name={item.name}
              price={item.price}
              // Image Fallback: Uses a placeholder if the images array is empty
              img={item.images && item.images.length > 0 ? item.images[0] : "https://via.placeholder.com/300"}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    // Main Container: Full screen height with primary theme background
    <div className="w-full min-h-screen bg-primary px-4 md:px-12 py-8 relative">
      
      {/* SECTION 1: HEADER & SEARCH
          Contains the Page Title, Description, and the Floating Search Bar.
      */}
      <div className="flex flex-col items-center gap-6 mb-12">
        <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-secondary text-center">
            Our <span className="text-accent italic">Collection</span>
        </h1>
        <p className="text-secondary/60 font-['Montserrat'] text-center max-w-lg">
            Explore our curated selection of organic skin essentials designed to make you glow.
        </p>

        {/* Floating Material Design Search Bar */}
        <div className="relative w-full max-w-md mt-4 group">
            
            {/* Search Icon (Left) */}
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400 group-focus-within:text-accent transition-colors text-xl"/>
            </div>
            
            {/* Input Field */}
            <input 
                type="text" 
                placeholder="Search products, categories..." 
                className="w-full pl-12 pr-4 py-4 rounded-full bg-white shadow-lg shadow-gray-200/50 border-2 border-transparent focus:border-accent/50 focus:outline-none focus:shadow-xl transition-all duration-300 font-['Montserrat'] text-secondary"
                onChange={(e) => setQuery(e.target.value)}
            />
            
            {/* Filter Icon (Right - Visual Only) */}
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer hover:text-accent transition-colors text-gray-400">
                <FiFilter />
            </div>
        </div>
      </div>

      {/* SECTION 2: PRODUCT GRID DISPLAY
          Handles Loading state and displays categorized content or empty state.
      */}
      {loading ? (
        // Loading State: Centers the Loader component
        <div className="w-full h-[50vh] flex justify-center items-center">
            <Loader />
        </div>
      ) : (
        // Content State
        <div className="w-full max-w-7xl mx-auto">
            {filteredProducts.length > 0 ? (
                // If products exist, render sections for each category
                <>
                    {renderProductSection("Cream", creams)}
                    {renderProductSection("Lotion", lotions)}
                    {renderProductSection("Serum", serums)}
                </>
            ) : (
                // Empty State: Displayed when search yields no results
                <div className="flex flex-col items-center justify-center h-[300px] text-secondary/50">
                    <FiSearch className="text-6xl mb-4 opacity-20" />
                    <p className="text-xl font-['Playfair_Display']">No products found.</p>
                    <p className="text-sm font-['Montserrat']">Try adjusting your search terms.</p>
                </div>
            )}
        </div>
      )}
    </div>
  );
}