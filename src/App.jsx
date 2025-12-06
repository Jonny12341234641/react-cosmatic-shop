// import './App.css';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import AdminPage from './pages/adminPage.jsx';
// import HomePage from './pages/homePage.jsx';
// import TestPage from './pages/test.jsx';
// import LoginPage from './pages/loginPage.jsx';


// function App() {

//   return (
//     <>
//         <BrowserRouter>
//             <div className="w-full h-screen">
//                 <Routes path="/">
//                     <Route path="/*" element={<HomePage/>}></Route>
//                     <Route path="/register" element={<h1>Register Page</h1>}></Route>
//                     <Route path="/admin/*" element={<AdminPage/>}></Route> //* means any path inside admin page can be accessed either by /admin or /admin/anything
//                     <Route path="/test" element={<TestPage/>}></Route>
//                     <Route path="/login" element={<LoginPage/>}></Route>
//                 </Routes>
//             </div>
//         </BrowserRouter>
//     </>
    
//   )
// }

// export default App


import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // FIX 1: Import Toaster
import AdminPage from './pages/adminPage.jsx';
import HomePage from './pages/homePage.jsx';
import TestPage from './pages/test.jsx';
import LoginPage from './pages/loginPage.jsx';

function App() {

  return (
    <>
        <BrowserRouter>
            {/* FIX 2: Add Toaster here so popups can appear anywhere */}
            <Toaster position="top-right" reverseOrder={false} />

            <div className="w-full h-screen">
                {/* FIX 3: Removed invalid path="/" from Routes */}
                <Routes>
                    {/* Specific routes should come FIRST */}
                    <Route path="/register" element={<h1>Register Page</h1>}></Route>
                    <Route path="/admin/*" element={<AdminPage/>}></Route> 
                    <Route path="/test" element={<TestPage/>}></Route>
                    <Route path="/login" element={<LoginPage/>}></Route>
                    
                    {/* FIX 4: Moved the "Catch-all" (/*) to the BOTTOM */}
                    <Route path="/*" element={<HomePage/>}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    </>
  )
}

export default App