import { Link, Route, Routes } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";
import { BsCartPlusFill } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi2";
import { AiOutlineProduct } from "react-icons/ai";
import AdminProductPage from "./admin/adminProductPage";
import AddProductPage from "./admin/adminAddNewProduct";
import UpdateProductPage from "./admin/adminUpdateProduct";


export default function AdminPage() {
    
    // Reusable style for navigation links to ensure consistency
    const navLinkStyle = "group flex items-center gap-4 px-6 py-4 rounded-xl text-primary/80 hover:bg-white/10 hover:text-accent hover:pl-8 transition-all duration-300 font-['Montserrat'] font-medium";
    const iconStyle = "text-xl group-hover:scale-110 transition-transform duration-300";

    return (
        <div className="flex h-screen w-full bg-primary overflow-hidden">
            
            {/* Sidebar Navigation */}
            <aside className="w-72 bg-secondary flex flex-col shadow-2xl z-20 h-full flex-shrink-0">
                
                {/* Logo Section */}
                <div className="h-24 flex items-center px-8 border-b border-gray-600/30">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-accent rounded-lg flex items-center justify-center shadow-lg shadow-accent/20">
                            {/* Assuming logo.png might be transparent, using an img tag or fallback */}
                            <img className="h-full w-full object-cover rounded-lg" src="/logo.png" alt="Logo" />
                        </div>
                        <span className="text-primary text-xl font-bold font-['Playfair_Display'] tracking-wide">
                            Admin Panel
                        </span>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 flex flex-col gap-2 p-6 overflow-y-auto">
                    <Link to="/admin" className={navLinkStyle}>
                        <FaChartLine className={iconStyle} />
                        Dashboard
                    </Link>
                    
                    <Link to="/admin/orders" className={navLinkStyle}>
                        <BsCartPlusFill className={iconStyle} />
                        Orders
                    </Link>
                    
                    <Link to="/admin/products" className={navLinkStyle}>
                        <AiOutlineProduct className={iconStyle} />
                        Products
                    </Link>
                    
                    <Link to="/admin/users" className={navLinkStyle}>
                        <HiOutlineUsers className={iconStyle} />
                        Users
                    </Link>
                </nav>

                {/* Optional: User Profile snippet at bottom of sidebar could go here */}
                <div className="p-6 text-center text-xs text-primary/40 font-['Montserrat']">
                    &copy; 2025 Admin Dashboard
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full relative">
                {/* Top Header / Breadcrumb Area (Visual only, to separate content) */}
                <div className="h-20 bg-primary/50 backdrop-blur-sm sticky top-0 z-10 flex items-center px-8 border-b border-accent/10">
                    <h1 className="text-2xl font-bold text-secondary font-['Playfair_Display']">
                        Crystal Beauty Cosmatics
                    </h1>
                </div>

                {/* Scrollable Page Content */}
                <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
                    {/* Using a container with max-width helps content not stretch too wide on huge screens.
                       Added a subtle fade-in animation for smoother page loads.
                    */}
                    <div className="w-full max-w-7xl mx-auto min-h-full animate-fade-in-up">
                        <Routes path="/">
                            <Route path="/" element={
                                <div className="p-10 border-2 border-dashed border-accent/30 rounded-2xl flex flex-col items-center justify-center text-secondary/60 h-[400px]">
                                    <FaChartLine className="text-6xl text-accent mb-4 opacity-50"/>
                                    <h2 className="text-3xl font-['Playfair_Display']">Dashboard Overview</h2>
                                    <p className="font-['Montserrat'] mt-2">Select an option from the sidebar</p>
                                </div>
                            }></Route>
                            <Route path="/products" element={<AdminProductPage />}></Route>
                            <Route path="/orders" element={
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-accent/10">
                                    <h1 className="text-3xl font-['Playfair_Display'] text-secondary mb-6">Recent Orders</h1>
                                    <div className="h-64 bg-primary/30 rounded-xl flex items-center justify-center text-secondary/50 font-['Montserrat']">
                                        No active orders found.
                                    </div>
                                </div>
                            }></Route>
                            {/* Note: In your original code, this route was nested. I kept the logic intact. */}
                            <Route path="/add-product" element={<AddProductPage/>}></Route>
                            <Route path="/update-product" element={<UpdateProductPage/>}></Route>
                        </Routes>
                    </div>
                </div>
            </main>
        </div>
    )
}