import { Route, Routes } from "react-router-dom";

export default function AdminPage() {
    return (
        <>
            <div className="w-full h-full bg-primary flex flex-row p-2 text-secondary">
                <div className="w-[300px] h-full bg-primary flex flex-col text-white items-center gap-[20px]">
                    <div className="flex flex-row w-[90%] h-[70px] bg-accent items-center rounded-xl">
                        <img className="h-[95px] object-cover" src="/logo.png" alt="" />
                        <span className="text-white text-lg ml-4">Admin Panel</span>
                    </div>
                </div>
                <div className="w-[calc(100%-300px)] h-full border-[4px] border-accent rounded-[20px] overflow-hidden shadow">
                    <div className="h-full width-full max-width-full max-h-full overflow-y-scroll">
                        <Routes path="/">
                            <Route path="/" element={<h1>Dashboard</h1>}></Route>
                            <Route path="/products" element={<h1>Products</h1>}></Route>
                            <Route path="/orders" element={<h1>Orders</h1>}></Route>
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    )
}