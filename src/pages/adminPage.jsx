import { Link, Route, Routes } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";
import { BsCartPlusFill } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi2";
import { AiOutlineProduct } from "react-icons/ai";
import AdminProductPage from "./admin/adminProductPage";
import AddProductPage from "./admin/adminAddNewProduct";
import UpdateProductPage from "./admin/adminUpdateProduct";
import AdminOrdersPage from "./admin/adminOrdersPage";

/**
 * AdminPage Component
 * =============================================================================
 * This component acts as the main layout shell for the administrative dashboard.
 * It implements a persistent sidebar navigation and a dynamic main content area.
 * * Functional Overview:
 * 1. Layout: Uses a flexbox container to separate the Sidebar (fixed width) from
 * the Main Content (flex-grow).
 * 2. Navigation: Provides links to various admin modules (Dashboard, Orders, Products, Users).
 * 3. Routing: Uses React Router's <Routes> to render different sub-components 
 * based on the current URL path.
 * =============================================================================
 */
export default function AdminPage() {
    
  // Styling Constants:
  // Centralized Tailwind CSS strings for navigation links to ensure consistency (DRY principle).
  // Includes hover effects, transitions, and typography settings.
  const navLinkStyle = "group flex items-center gap-4 px-6 py-4 rounded-xl text-primary/80 hover:bg-white/10 hover:text-accent hover:pl-8 transition-all duration-300 font-['Montserrat'] font-medium";
  const iconStyle = "text-xl group-hover:scale-110 transition-transform duration-300";

  return (
    // Main Wrapper: Full screen height, Flexbox layout, Hidden overflow to manage internal scrolling
    <div className="flex h-screen w-full bg-primary overflow-hidden">
        
      {/* 1. SIDEBAR SECTION
        ------------------------------------------------------------------------
        - Fixed width (w-72)
        - High z-index to stay above content if necessary
        - Flex column layout to push the footer to the bottom
      */}
      <aside className="w-72 bg-secondary flex flex-col shadow-2xl z-20 h-full flex-shrink-0">
          
        {/* Logo and Branding Header */}
        <div className="h-24 flex items-center px-8 border-b border-gray-600/30">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-accent rounded-lg flex items-center justify-center shadow-lg shadow-accent/20">
              <img 
                className="h-full w-full object-cover rounded-lg" 
                src="/logo.png" 
                alt="Logo" 
              />
            </div>
            <span className="text-primary text-xl font-bold font-['Playfair_Display'] tracking-wide">
              Admin Panel
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 flex flex-col gap-2 p-6 overflow-y-auto">
          
          {/* Dashboard Link */}
          <Link to="/admin" className={navLinkStyle}>
            <FaChartLine className={iconStyle} />
            Dashboard
          </Link>
          
          {/* Orders Link */}
          <Link to="/admin/orders" className={navLinkStyle}>
            <BsCartPlusFill className={iconStyle} />
            Orders
          </Link>
          
          {/* Products Link */}
          <Link to="/admin/products" className={navLinkStyle}>
            <AiOutlineProduct className={iconStyle} />
            Products
          </Link>
          
          {/* Users Link */}
          <Link to="/admin/users" className={navLinkStyle}>
            <HiOutlineUsers className={iconStyle} />
            Users
          </Link>

        </nav>

        {/* Sidebar Footer / Copyright */}
        <div className="p-6 text-center text-xs text-primary/40 font-['Montserrat']">
          &copy; 2025 Admin Dashboard
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA
        ------------------------------------------------------------------------
        - Flex-1 to occupy remaining width
        - Relative positioning for internal absolute elements (if any)
      */}
      <main className="flex-1 flex flex-col h-full relative">
          
        {/* Top Header Bar */}
        <div className="h-20 bg-primary/50 backdrop-blur-sm sticky top-0 z-10 flex items-center px-8 border-b border-accent/10">
          <h1 className="text-2xl font-bold text-secondary font-['Playfair_Display']">
            Crystal Beauty Cosmatics
          </h1>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
          
          {/* Inner Content Wrapper: Centers content and adds entrance animation */}
          <div className="w-full max-w-7xl mx-auto min-h-full animate-fade-in-up">
            
            {/* Routing Configuration:
              Define the render logic for specific paths within the admin panel.
            */}
            <Routes path="/">
              
              {/* Default Route: Dashboard Overview Placeholder */}
              <Route 
                path="/" 
                element={
                  <div className="p-10 border-2 border-dashed border-accent/30 rounded-2xl flex flex-col items-center justify-center text-secondary/60 h-[400px]">
                    <FaChartLine className="text-6xl text-accent mb-4 opacity-50"/>
                    <h2 className="text-3xl font-['Playfair_Display']">Dashboard Overview</h2>
                    <p className="font-['Montserrat'] mt-2">Select an option from the sidebar</p>
                  </div>
                } 
              />
              
              {/* Feature Routes */}
              <Route path="/products" element={<AdminProductPage />} />
              <Route path="/orders" element={<AdminOrdersPage />} />
              <Route path="/add-product" element={<AddProductPage />} />
              <Route path="/update-product" element={<UpdateProductPage />} />
              
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}