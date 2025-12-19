import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

/**
 * Header Component
 * =============================================================================
 * This functional component renders the main navigation bar of the application.
 * * Functional Steps:
 * 1. Initializes the header container with sticky positioning to remain at the 
 * top of the viewport during scrolling.
 * 2. Establishes a responsive container to center content and manage spacing.
 * 3. Renders the application Logo, linking back to the root ('/') route.
 * 4. Renders the Navigation menu containing internal links (Home, Products, About)
 * and a distinct Call-to-Action (Contact) button.
 * 5. Includes the 'Toaster' component for displaying global notifications.
 * 6. Renders the Shopping Cart icon with absolute positioning.
 * =============================================================================
 */
export default function Header() {
  return (
    /* Main Header Container
      - sticky: Keeps header fixed at the top.
      - z-50: Ensures header stays above other content.
      - backdrop-blur-sm: Adds a frosted glass effect to the background.
    */
    <header className="w-full bg-primary/95 backdrop-blur-sm h-[90px] shadow-md sticky top-0 z-50 px-6 transition-all duration-300">
      
      {/* Content Wrapper: Restricts max width and handles flex alignment */}
      <div className="max-w-7xl mx-auto h-full flex justify-between items-center">
        
        {/* 1. LOGO SECTION
          Wraps the image in a React Router Link to enable client-side navigation to Home.
        */}
        <Link to="/" className="flex-shrink-0">
          <img 
            src="/logo.png" 
            className="h-[60px] w-auto object-contain hover:scale-105 transition-transform duration-300" 
            alt="Logo"
          />
        </Link>

        {/* 2. NAVIGATION SECTION
          Contains the main menu links and the notification toaster.
        */}
        <div className="flex items-center gap-8 font-medium text-secondary">
          
          {/* Global Notification Toaster */}
          <Toaster position="top-right" />

          {/* Navigation Link: Home 
            Uses a 'group' class to trigger the nested span's width expansion on hover,
            creating an animated underline effect.
          */}
          <Link 
            to="/" 
            className="relative group hover:text-accent transition-colors duration-300"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* Navigation Link: Products */}
          <Link 
            to="/products" 
            className="relative group hover:text-accent transition-colors duration-300"
          >
            Products
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* Navigation Link: About */}
          <Link 
            to="/about" 
            className="relative group hover:text-accent transition-colors duration-300"
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* Call-to-Action (CTA): Contact
            Styled differently from standard links (pill shape, background color)
            to draw user attention.
          */}
          <Link 
            to="/contact" 
            className="px-6 py-2.5 bg-accent text-white rounded-full shadow-lg hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all duration-300 font-semibold"
          >
            Contact
          </Link>
        </div>

        {/* 3. SHOPPING CART SECTION
          Positioned absolutely to the right side of the container.
        */}
        <Link 
          to="/cart" 
          className="text-2xl text-secondary hover:text-accent transition-colors duration-300 absolute right-6 top-5 bottom-5 flex items-center"
        >
          <FiShoppingCart />
        </Link>

      </div>
    </header>
  );
}