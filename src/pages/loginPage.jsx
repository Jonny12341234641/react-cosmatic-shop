
// import { useState } from 'react';
// import axios from 'axios';
// export default function LoginPage() {

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     async function login() {
//         const response = await axios.post(import.meta.env.VITE_API_URL + "/api/users/login", { //*
//             email : email,
//             password : password
//         });
//     }

//     return (
//             <div className="w-full h-full bg-[url(/src/assets/login.jpg)] bg-cover bg-center bg-no-repeat flex">
//                 <div className="w-[50%] h-full border border-white">

//                 </div>

//                 <div className="w-[50%] h-full border border-white flex justify-center items-center">
//                     <div className="w-[500px] h-[500px] border border-white backdrop-blur-md shadow-2xl rounded-[20px] flex flex-col justify-center items-center gap-[20px]">
//                         <input onChange={
//                             (e)=>{
//                                 console.log("Email changed...")
//                                 setEmail(e.target.value)
//                             }
//                         } type="text" className="w-[400px] h-[40px] bg-white shadow-2xl rounded" />
//                         <input onChange={
//                             (e)=>{
//                                 console.log("Password changed")
//                                 setPassword(e.target.value)
//                             }
//                         } type="password" className="w-[400px] h-[40px] bg-white shadow-2xl rounded" />
//                         <button onClick={login} className="bg-red-900 w-[400px] h-[40px] ">
//                             Login
//                         </button>
//                     </div>
//                 </div>
//             </div>
//     )
// }


// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function LoginPage() {

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     async function login() {
//         try{
//             const response = await axios.post(import.meta.env.VITE_API_URL + "/api/users/login", {  
//             email : email,
//             password : password
//         });

//         const user = response.data.user;
//         if(user.role == "admin"){
//             navigate("/admin"); // Redirect to the admin page
//         }else{
//             navigate("/"); // Redirect to the home page
//         }
//         }catch(e){
//             if(e.response.status == 404){
//                 alert("User not found");
//         }
//         }
//     }

//     return (
//         <div className="w-full min-h-screen flex font-sans text-secondary">
            
//             {/* Left Side: Image & Logo */}
//             <div className="hidden lg:flex lg:w-1/2 relative bg-[url(/src/assets/login.jpg)] bg-cover bg-center">
//                 {/* Dark Overlay for contrast */}
//                 <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
                
//                 {/* Logo Placement */}
//                 <div className="absolute top-10 left-10 z-10">
//                     <img src="/logo.png" alt="CBC Logo" className="w-32 opacity-90 hover:opacity-100 transition-opacity" />
//                 </div>

//                 <div className="relative z-10 w-full h-full flex flex-col justify-end p-16">
//                     <h2 className="text-white text-4xl font-bold leading-tight">Crystal Beauty Clear</h2>
//                     <p className="text-white/80 mt-4 text-lg">Experience the elegance of pure beauty.</p>
//                 </div>
//             </div>

//             {/* Right Side: Login Form */}
//             <div className="w-full lg:w-1/2 bg-primary flex flex-col justify-center items-center p-8">
                
//                 {/* Mobile Logo (Visible only on small screens) */}
//                 <div className="lg:hidden mb-8">
//                      {/* Using a dark version or filter for the white logo on light bg, or a container */}
//                     <div className="bg-secondary p-3 rounded-full">
//                         <img src="/logo.png" alt="CBC Logo" className="w-16" />
//                     </div>
//                 </div>

//                 <div className="w-full max-w-[450px] bg-white/60 backdrop-blur-xl border border-white shadow-xl rounded-3xl p-10 flex flex-col gap-6">
                    
//                     <div className="text-center mb-2">
//                         <h1 className="text-3xl font-bold text-secondary tracking-tight">Welcome Back</h1>
//                         <p className="text-secondary/60 text-sm mt-2">Please enter your details to sign in.</p>
//                     </div>

//                     <div className="flex flex-col gap-5">
//                         {/* Email Input */}
//                         <div className="flex flex-col gap-2">
//                             <label className="text-sm font-semibold ml-1 text-secondary/80">Email</label>
//                             <input 
//                                 onChange={(e)=>{
//                                     console.log("Email changed...")
//                                     setEmail(e.target.value)
//                                 }} 
//                                 type="text" 
//                                 placeholder="example@cbc.com"
//                                 className="w-full h-[50px] px-4 bg-white border border-secondary/10 rounded-xl outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all shadow-sm text-secondary placeholder:text-secondary/30" 
//                             />
//                         </div>

//                         {/* Password Input */}
//                         <div className="flex flex-col gap-2">
//                             <label className="text-sm font-semibold ml-1 text-secondary/80">Password</label>
//                             <input 
//                                 onChange={(e)=>{
//                                     console.log("Password changed")
//                                     setPassword(e.target.value)
//                                 }} 
//                                 type="password" 
//                                 placeholder="••••••••"
//                                 className="w-full h-[50px] px-4 bg-white border border-secondary/10 rounded-xl outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all shadow-sm text-secondary placeholder:text-secondary/30" 
//                             />
//                         </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="mt-4">
//                         <button 
//                             onClick={login} 
//                             className="w-full h-[50px] bg-accent text-white font-bold rounded-xl shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98] cursor-pointer"
//                         >
//                             Login
//                         </button>
//                     </div>

//                     <div className="text-center text-sm text-secondary/60">
//                         Don't have an account? <span className="text-accent font-bold cursor-pointer hover:underline">Sign Up</span>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     )
// }



import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast/headless';

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function login() {
        try{
            const response = await axios.post(import.meta.env.VITE_API_URL + "/api/users/login", {  
            email : email,
            password : password
        });

        localStorage.setItem("token", response.data.token); // Store the token in local storage

        toast.success("Login successful!");

        const user = response.data.user;
        if(user.role == "admin"){
            navigate("/admin"); // Redirect to the admin page
        }else{
            navigate("/"); // Redirect to the home page
        }
        }catch(e){
            if(e.response.status == 404){
                alert("User not found")
                toast.error("Login failed!. Please check your credentials.");
        }
        }
    }

    return (
        <div className="w-full min-h-screen flex font-['Montserrat'] text-secondary bg-primary">
            
            {/* Left Side: Artistic Visual */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[url(/src/assets/login.jpg)] bg-cover bg-center">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
                
                {/* Brand Identity */}
                <div className="absolute top-12 left-12 z-10">
                    <img src="/logo.png" alt="CBC Logo" className="w-28 drop-shadow-lg" />
                </div>

                <div className="relative z-10 w-full h-full flex flex-col justify-end p-16 pb-20">
                    <h2 className="text-white text-5xl font-['Playfair_Display'] font-bold leading-tight drop-shadow-md">
                        Crystal Beauty <br/> <span className="text-primary italic">Clear</span>
                    </h2>
                    <div className="w-20 h-1 bg-accent mt-6 mb-4 rounded-full"></div>
                    <p className="text-white/90 text-lg font-light tracking-wide max-w-md">
                        Where nature meets science. Log in to access your exclusive beauty dashboard.
                    </p>
                </div>
            </div>

            {/* Right Side: Material Design Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 bg-white lg:bg-transparent">
                
                {/* Mobile Logo */}
                <div className="lg:hidden mb-8">
                    <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center shadow-lg">
                        <img src="/logo.png" alt="CBC Logo" className="w-12" />
                    </div>
                </div>

                <div className="w-full max-w-[480px] bg-white lg:shadow-2xl lg:shadow-secondary/10 rounded-[2rem] p-8 md:p-12 transition-all duration-300">
                    
                    <div className="mb-10">
                        <h1 className="text-3xl font-['Playfair_Display'] font-bold text-secondary mb-2">Welcome Back</h1>
                        <p className="text-secondary/60 font-medium text-sm">Enter your credentials to continue</p>
                    </div>

                    <div className="flex flex-col gap-8">
                        
                        {/* Material Input: Email */}
                        <div className="relative">
                            <input 
                                onChange={(e)=>{
                                    console.log("Email changed...")
                                    setEmail(e.target.value)
                                }} 
                                type="text" 
                                id="email_field"
                                className="block w-full px-4 py-3 text-secondary bg-transparent border-2 border-secondary/20 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-accent peer transition-colors duration-300" 
                                placeholder=" "
                            />
                            <label 
                                htmlFor="email_field"
                                className="absolute text-sm text-secondary/50 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-accent peer-focus:font-semibold peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4"
                            >
                                Email Address
                            </label>
                        </div>

                        {/* Material Input: Password */}
                        <div className="relative">
                            <input 
                                onChange={(e)=>{
                                    console.log("Password changed")
                                    setPassword(e.target.value)
                                }} 
                                type="password"
                                id="password_field" 
                                className="block w-full px-4 py-3 text-secondary bg-transparent border-2 border-secondary/20 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-accent peer transition-colors duration-300" 
                                placeholder=" "
                            />
                            <label 
                                htmlFor="password_field"
                                className="absolute text-sm text-secondary/50 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-accent peer-focus:font-semibold peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4"
                            >
                                Password
                            </label>
                        </div>
                    </div>

                    {/* Forgot Password Link (Visual only) */}
                    <div className="flex justify-end mt-2 mb-6">
                        <span className="text-xs font-semibold text-secondary/70 hover:text-accent cursor-pointer transition-colors">
                            Forgot Password?
                        </span>
                    </div>

                    {/* Material Button */}
                    <button 
                        onClick={login} 
                        className="w-full h-[54px] bg-secondary text-white font-bold rounded-xl shadow-lg shadow-secondary/20 hover:bg-accent hover:shadow-accent/40 active:scale-[0.98] active:shadow-none transition-all duration-300 tracking-wide text-sm uppercase"
                    >
                        Login
                    </button>

                    <div className="mt-8 flex items-center gap-4">
                        <div className="h-[1px] bg-secondary/10 flex-1"></div>
                        <span className="text-xs text-secondary/40 font-semibold uppercase">Or</span>
                        <div className="h-[1px] bg-secondary/10 flex-1"></div>
                    </div>

                    <div className="text-center text-sm text-secondary/70 mt-8">
                        New to CBC? <span className="text-accent font-bold cursor-pointer hover:underline">Create Account</span>
                    </div>

                </div>
            </div>
        </div>
    )
}