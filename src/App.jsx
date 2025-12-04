import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPage from './pages/adminPage.jsx';
import HomePage from './pages/homePage.jsx';
import TestPage from './pages/test.jsx';
import LoginPage from './pages/loginPage.jsx';


function App() {

  return (
    <>
        <BrowserRouter>
            <div className="w-full h-screen">
                <Routes path="/">
                    <Route path="/*" element={<HomePage/>}></Route>
                    <Route path="/register" element={<h1>Register Page</h1>}></Route>
                    <Route path="/admin/*" element={<AdminPage/>}></Route> //* means any path inside admin page can be accessed either by /admin or /admin/anything
                    <Route path="/test" element={<TestPage/>}></Route>
                    <Route path="/login" element={<LoginPage/>}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    </>
    
  )
}

export default App
