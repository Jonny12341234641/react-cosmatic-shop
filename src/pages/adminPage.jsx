import { Route, Routes } from "react-router-dom";

export default function AdminPage() {
    return (
        <>
            <div className="w-full h-full bg-primary flex flex-row p-2">
                <div className="w-[300px] h-full bg-primary">
                    
                </div>
                <div className="w-[calc(100%-300px)] h-full border-2 border-accent rounded-[20px]">
                    <Routes path="/">
                        <Route path="/" element={<h1>Dashboard</h1>}></Route>
                        <Route path="/products" element={<h1>Products</h1>}></Route>
                        <Route path="/orders" element={<h1>Orders</h1>}></Route>
                    </Routes>
                </div>
            </div>
        </>
    )
}