import './App.css';
import ProductCard from './components/productCard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {

  return (
    <>
        <BrowserRouter>
            <div className="w-full h-[50vh] bg-red-600">
                <Routes path="/">
                    <Route path="/" element={<h1>Home page</h1>}></Route>
                    <Route path="/register" element={<h1>Register page</h1>}></Route>
                    <Route path="/admin" element={<h1>Admin page</h1>}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    </>
    
  )
}

export default App
