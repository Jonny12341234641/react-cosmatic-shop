import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast'; // FIX 1: Removed '/headless' so popups actually show

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();


/**
 * Attempts to log in a user with the given email and password
 * If successful, stores the token and user data in local storage
 * and redirects to the appropriate page based on the user's role
 * If not successful, displays an error message based on the status code
 * @param {string} email - The email of the user to log in
 * @param {string} password - The password of the user to log in
 */
    async function login() {
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + "/api/users/login", {  
                email : email,
                password : password
            });

            // Store token and user data
            localStorage.setItem("token", response.data.token);
            
            // FIX 2: Added success message
            toast.success("Login successful!");

            const user = response.data.user;

            if(location.state && location.state.from){
                navigate(location.state.from);
            }else{
                //default logic if regular login
                if(user.role == "admin"){
                    navigate("/admin"); // Redirect to the admin page
                } else {
                    navigate("/"); // Redirect to the home page
                }
            }

        } catch(e) {
            // FIX 3: Better error handling for different scenarios
            const status = e.response?.status;
            if(status == 404){
                toast.error("User not found");
            } else if (status == 401) {
                toast.error("Invalid password");
            } else {
                toast.error("Login failed! Please check your connection.");
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