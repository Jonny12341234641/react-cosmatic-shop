import { Route, Routes } from "react-router-dom";
import Header from "../components/header";

export default function HomePage() {
    return (
        <div className="w-full h-full bg-primary">
            <Header></Header>
            <Routes path="/">
                    <Route path="/*" element={<h1>Home</h1>}></Route>
                    <Route path="/products" element={<h1>Product List</h1>}></Route>
                    <Route path="/about" element={<h1>About</h1>}></Route>
                    <Route path="/contact" element={<h1>Contact</h1>}></Route>
                    <Route path="/*" element={<h1>404 Not Found</h1>}></Route>
            </Routes>
        </div>
    )
}