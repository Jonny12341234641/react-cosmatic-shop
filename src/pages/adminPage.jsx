import { Link, Route, Routes } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";
import { BsCartPlusFill } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi2";
import { AiOutlineProduct } from "react-icons/ai";
import AdminProductPage from "./admin/adminProductPage";
import { FaRegTrashAlt } from "react-icons/fa";
import AddProductPage from "./admin/adminAddNewProduct";




export default function AdminPage() {
    return (
        <>
            <div className="w-full h-full bg-primary flex flex-row p-2 text-secondary">
                <div className="w-[300px] h-full bg-primary flex flex-col text-white items-center gap-[10px]">
                    <div className="flex flex-row w-[90%] h-[70px] bg-accent items-center rounded-xl mb-[20px]">
                        <img className="h-[95px] object-cover" src="/logo.png" alt="" />
                        <span className="text-white text-lg ml-4">Admin Panel</span>
                    </div>
                    <Link to="/admin" className="w-[90%] text-secondary flex items-center gap-2 p-4 hover:bg-accent rounded-lg">
                        <FaChartLine className="text-secondary text-2xl" />
                        Dashboard
                    </Link>
                    <Link to="/admin/orders" className="w-[90%] text-secondary flex items-center gap-2 p-4 hover:bg-accent rounded-lg">
                        <BsCartPlusFill className="text-secondary text-2xl" />
                        Orders
                    </Link>
                    <Link to="/admin/products" className="w-[90%] text-secondary flex items-center gap-2 p-4 hover:bg-accent rounded-lg">
                        <AiOutlineProduct className="text-secondary text-2xl" />
                        Products
                    </Link>
                    <Link to="/admin/users" className="w-[90%] text-secondary flex items-center gap-2 p-4 hover:bg-accent rounded-lg">
                        <HiOutlineUsers className="text-secondary text-2xl" />
                        Users
                    </Link>
                </div>
                <div className="w-[calc(100%-300px)] h-full border-[4px] border-accent rounded-[20px] overflow-hidden shadow">
                    <div className="h-full width-full max-width-full max-h-full overflow-y-scroll">
                        <Routes path="/">
                            <Route path="/" element={<h1>Dashboard</h1>}></Route>
                            <Route path="/products" element={<AdminProductPage />}></Route>
                            <Route path="/orders" element={<h1>Orders</h1>}></Route>
                            <Route path="/add-product" element={<AddProductPage/>}></Route>
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    )
}