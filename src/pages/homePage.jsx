// import { Route, Routes } from "react-router-dom";
// import Header from "../components/header";
// import { FiArrowRight } from "react-icons/fi";

// export default function HomePage() {
//     return (
//         <div className="w-full h-full bg-primary">
//             <Header></Header>
//             <Routes path="/">
//                     <Route path="/*" element={<h1>Home</h1>}></Route>
//                     <Route path="/products" element={<h1>Product List</h1>}></Route>
//                     <Route path="/about" element={<h1>About</h1>}></Route>
//                     <Route path="/contact" element={<h1>Contact</h1>}></Route>
//                     <Route path="/*" element={<h1>404 Not Found</h1>}></Route>
//             </Routes>
//         </div>
//     )
// }

// Revised HomePage Component with Proper Routing on Tuesday, December 9, 2025

import { Route, Routes, Link } from "react-router-dom";
import Header from "../components/header";
import ProductCard from "../components/productCard"; // Ensure you have this component
import { FiArrowRight, FiCheckCircle, FiTruck, FiShield } from "react-icons/fi"; // Install react-icons if needed
import ProductPage from "./productPage.jsx";
import AboutPage from "./aboutPage.jsx";
import ContactPage from "./contactPage.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "../components/loader.jsx";

// --- SUB-COMPONENT: The Main Landing Page Content ---
function HomeContent() {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(import.meta.env.VITE_API_URL + "/api/products")
      .then((res) => {
        const products = res.data;
        const creams = products.filter(p => p.category === 'cream');
        const lotions = products.filter(p => p.category === 'lotion');
        const serums = products.filter(p => p.category === 'serum');

        const randomProducts = [];
        if (creams.length > 0) {
          randomProducts.push(creams[Math.floor(Math.random() * creams.length)]);
        }
        if (lotions.length > 0) {
          randomProducts.push(lotions[Math.floor(Math.random() * lotions.length)]);
        }
        if (serums.length > 0) {
          randomProducts.push(serums[Math.floor(Math.random() * serums.length)]);
        }

        setTrendingProducts(randomProducts);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Error fetching trending products");
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full flex flex-col gap-16 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="w-full min-h-[600px] flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-10">
        
        {/* Text Content */}
        <div className="flex-1 flex flex-col gap-6 items-start z-10">
          <span className="text-accent font-bold tracking-widest uppercase text-sm bg-orange-100 px-4 py-1 rounded-full">
            New Collection 2025
          </span>
          <h1 className="text-6xl md:text-7xl font-['Playfair_Display'] font-bold text-secondary leading-tight">
            Nature's Secret to <br />
            <span className="text-accent italic">Radiant</span> Skin.
          </h1>
          <p className="text-secondary/70 text-lg font-['Montserrat'] max-w-lg leading-relaxed">
            Discover the purest organic ingredients blended with modern science. 
            Cruelty-free, sustainable, and designed for your inner glow.
          </p>
          
          <Link to="/products" className="group relative px-8 py-4 bg-secondary text-primary font-bold rounded-full shadow-xl hover:shadow-2xl hover:bg-accent transition-all duration-300 flex items-center gap-3">
            Shop Now
            <FiArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Hero Image / Visual */}
        <div className="flex-1 w-full h-full flex justify-center md:justify-end relative mt-10 md:mt-0">
            {/* Decorative blob behind image */}
            <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-accent/20 rounded-full blur-3xl -z-10"></div>
            
            {/* Main Image Container */}
            <div className="relative w-[350px] md:w-[450px] aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-[8px] border-white">
                <img 
                    src="https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?q=80&w=1000&auto=format&fit=crop" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    alt="Beauty Product"
                />
            </div>
        </div>
      </section>

      {/* 2. FEATURES / TRUST SIGNALS */}
      <section className="w-full px-6 md:px-20">
        <div className="w-full bg-white rounded-3xl shadow-lg shadow-gray-200/50 p-10 flex flex-wrap justify-around gap-8">
            <FeatureItem icon={<FiCheckCircle/>} title="100% Organic" desc="Certified natural ingredients" />
            <FeatureItem icon={<FiTruck/>} title="Fast Shipping" desc="Free delivery on orders over $50" />
            <FeatureItem icon={<FiShield/>} title="Secure Payment" desc="100% secure checkout process" />
        </div>
      </section>

      {/* 3. TRENDING PRODUCTS (Mockup) */}
      <section className="w-full px-6 md:px-20 flex flex-col gap-10">
        <div className="text-center">
            <h2 className="text-4xl font-['Playfair_Display'] font-bold text-secondary">Trending Essentials</h2>
            <div className="w-20 h-1 bg-accent mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Grid of Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
            {loading ? (
              <div className="w-full h-[20vh] flex justify-center items-center col-span-3"><Loader /></div>
            ) : (
              trendingProducts.map((product) => (
                <ProductCard
                  key={product.productID}
                  name={product.name}
                  price={product.price}
                  img={product.images && product.images.length > 0 ? product.images[0] : "https://via.placeholder.com/300"}
                />
              ))
            )}
        </div>
        
        <div className="flex justify-center mt-4">
             <Link to="/products" className="text-secondary font-bold hover:text-accent border-b-2 border-accent transition-colors pb-1">
                View All Products
             </Link>
        </div>
      </section>

      {/* 4. PROMO BANNER */}
      <section className="w-full px-6 md:px-20">
        <div className="w-full bg-secondary rounded-[3rem] p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl"></div>
            
            <div className="z-10 text-center md:text-left">
                <h3 className="text-white text-3xl md:text-5xl font-['Playfair_Display'] mb-4">
                    Join the <span className="text-accent">Glow</span> Club
                </h3>
                <p className="text-gray-300 font-['Montserrat']">
                    Sign up today and get <b className="text-white">15% OFF</b> your first order.
                </p>
            </div>

            <div className="z-10 flex gap-4 w-full md:w-auto">
                <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-1 md:w-64 px-6 py-4 rounded-full bg-white/10 text-white border border-white/20 focus:outline-none focus:border-accent"
                />
                <button className="px-8 py-4 bg-accent text-white font-bold rounded-full hover:bg-orange-600 transition-colors shadow-lg">
                    Subscribe
                </button>
            </div>
        </div>
      </section>

    </div>
  );
}

// --- HELPER COMPONENT FOR FEATURES ---
function FeatureItem({ icon, title, desc }) {
    return (
        <div className="flex items-center gap-4 group cursor-default">
            <div className="w-14 h-14 bg-primary rounded-full flex justify-center items-center text-accent text-2xl group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-sm">
                {icon}
            </div>
            <div>
                <h4 className="font-bold text-secondary text-lg">{title}</h4>
                <p className="text-gray-500 text-sm">{desc}</p>
            </div>
        </div>
    )
}


// --- MAIN PAGE COMPONENT ---
export default function HomePage() {
    return (
        // Added 'overflow-x-hidden' to prevent scrollbars from animations
        <div className="w-full min-h-screen bg-primary overflow-x-hidden">
            <Header />
            <Routes>
                    {/* Render the beautiful landing page content for the root path */}
                    <Route path="/" element={<HomeContent />} />
                    
                    {/* Keep your existing routes or placeholders */}
                    <Route path="/products" element={<ProductPage></ProductPage>} />
                    <Route path="/about" element={<AboutPage></AboutPage>} />
                    <Route path="/contact" element={<ContactPage></ContactPage>} />
                    <Route path="/*" element={<h1 className="text-center pt-20 text-3xl">404 Not Found</h1>} />
            </Routes>
        </div>
    )
}