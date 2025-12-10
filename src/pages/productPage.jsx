import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../components/productCard";
import { Loader } from "../components/loader";
import { FiSearch, FiFilter } from "react-icons/fi"; // Make sure to install react-icons

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  // FETCH DATA
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

  // FILTER LOGIC
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) || 
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  const creams = filteredProducts.filter((p) => p.category === "cream");
  const lotions = filteredProducts.filter((p) => p.category === "lotion");
  const serums = filteredProducts.filter((p) => p.category === "serum");

  const renderProductSection = (title, products) => {
    if (products.length === 0) return null;

    return(
      <div className="mb-12">
        <h2 className="text-3xl font-['Playfair_Display'] font-bold text-secondary mb-6">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {products.map((item) => (
            <ProductCard
              key={item.productID}
              name={item.name}
              price={item.price}
              img={item.images && item.images.length > 0 ? item.images[0] : "https://via.placeholder.com/300"}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-primary px-4 md:px-12 py-8 relative">
      
      {/* 1. HEADER & SEARCH SECTION */}
      <div className="flex flex-col items-center gap-6 mb-12">
        <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-secondary text-center">
            Our <span className="text-accent italic">Collection</span>
        </h1>
        <p className="text-secondary/60 font-['Montserrat'] text-center max-w-lg">
            Explore our curated selection of organic skin essentials designed to make you glow.
        </p>

        {/* Floating Material Search Bar */}
        <div className="relative w-full max-w-md mt-4 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400 group-focus-within:text-accent transition-colors text-xl"/>
            </div>
            <input 
                type="text" 
                placeholder="Search products, categories..." 
                className="w-full pl-12 pr-4 py-4 rounded-full bg-white shadow-lg shadow-gray-200/50 border-2 border-transparent focus:border-accent/50 focus:outline-none focus:shadow-xl transition-all duration-300 font-['Montserrat'] text-secondary"
                onChange={(e) => setQuery(e.target.value)}
            />
            {/* Optional Filter Icon for visual balance */}
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer hover:text-accent transition-colors text-gray-400">
                <FiFilter />
            </div>
        </div>
      </div>

      {/* 2. PRODUCT GRID SECTION */}
      {loading ? (
        <div className="w-full h-[50vh] flex justify-center items-center">
            <Loader />
        </div>
      ) : (
        <div className="w-full max-w-7xl mx-auto">
            {filteredProducts.length > 0 ? (
                <>
                    {renderProductSection("Cream", creams)}
                    {renderProductSection("Lotion", lotions)}
                    {renderProductSection("Serum", serums)}
                </>
            ) : (
                // Empty State
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