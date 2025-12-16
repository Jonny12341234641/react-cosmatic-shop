// import { Toaster } from "react-hot-toast";
// import { Link } from "react-router-dom";

// export default function Header(){
//     return(
//         <header className="w-full bg-accent h-[100px] text-white px-[40px]">
//             <div className="w-full h-full flex relative">
//                 <img src="/logo.png" className="h-full absolute w-[170px] left-0 object-cover"/>
//                 <div className="h-full flex justify-center items-center w-full gap-[20px] text-lg">
//                     {/* <a href="/">Home</a>
//                     <a href="/product">Products</a>
//                     <a href="/about">About</a>
//                     <a href="/contact">Contact</a> */}

                    
//                     <Toaster position="top-right"></Toaster>
                    
//                     <Link to="/">Home</Link> 
//                     <Link to="/products">Products</Link>
//                     <Link to="/about">About</Link>
//                     <Link to="/contact">Contact</Link>
//                 </div>
//             </div>
//         </header>
//     )
// }

// Revised Header Component with Modern Design on Tuesday, December 9, 2025

import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

export default function Header() {
  return (
    // CHANGE: Added 'sticky', 'z-50', and 'shadow-md' for a floating modern header feel.
    // CHANGE: Switched bg to 'bg-primary' (cream) for a cleaner, material look instead of heavy orange.
    <header className="w-full bg-primary/95 backdrop-blur-sm h-[90px] shadow-md sticky top-0 z-50 px-6 transition-all duration-300">
      
      {/* CHANGE: Used 'max-w-7xl' and 'justify-between' to push Logo and Nav apart naturally */}
      <div className="max-w-7xl mx-auto h-full flex justify-between items-center">
        
        {/* LOGO SECTION */}
        {/* CHANGE: Removed 'absolute'. Added hover scale effect for interactivity. */}
        <Link to="/" className="flex-shrink-0">
            <img 
                src="/logo.png" 
                className="h-[60px] w-auto object-contain hover:scale-105 transition-transform duration-300" 
                alt="Logo"
            />
        </Link>

        {/* NAVIGATION SECTION */}
        <div className="flex items-center gap-8 font-medium text-secondary">
          
          <Toaster position="top-right"></Toaster>

          {/* CHANGE: Added generic hover underline animation for links */}
          <Link 
            to="/" 
            className="relative group hover:text-accent transition-colors duration-300"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link 
            to="/products" 
            className="relative group hover:text-accent transition-colors duration-300"
          >
            Products
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link 
            to="/about" 
            className="relative group hover:text-accent transition-colors duration-300"
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* CHANGE: Styled 'Contact' as a pill button (CTA) to make it stand out */}
          <Link 
            to="/contact" 
            className="px-6 py-2.5 bg-accent text-white rounded-full shadow-lg hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all duration-300 font-semibold"
          >
            Contact
          </Link>
        </div>

        <Link to="/cart" className="text-2xl text-secondary hover:text-accent transition-colors duration-300 absolute right-6 top-5 bottom-5 flex items-center">
          <FiShoppingCart></FiShoppingCart>
        </Link>

      </div>
    </header>
  );
}