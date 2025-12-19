import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

/**
 * LoginPage Component
 * =============================================================================
 * Handles user authentication and access control for the application.
 * * Functional Overview:
 * 1. UI Layout: Features a split-screen design with a branding visual on the left
 * and a material design login form on the right.
 * 2. State Management: Captures user credentials (email/password) via local state.
 * 3. API Integration: Submits credentials to the backend for verification.
 * 4. Session Management: Stores the JWT token upon success.
 * 5. Navigation: Redirects users based on their role (Admin vs. User) or their
 * previous location if redirected from a protected route.
 * =============================================================================
 */
export default function LoginPage() {

    // State Initialization
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    // Navigation Hooks
    const navigate = useNavigate();
    const location = useLocation();

    /**
     * login Asynchronous Handler
     * -------------------------------------------------------------------------
     * Executes the authentication process.
     * * Steps:
     * 1. API Call: Sends a POST request to '/api/users/login' with email and password.
     * 2. Token Storage: Saves the received JWT token to localStorage for persistent sessions.
     * 3. Success Feedback: Displays a success toast notification.
     * 4. User Extraction: Retrieves user details from the response.
     * 5. Navigation Logic:
     * - If the user was redirected here from a specific page (location.state.from),
     * send them back to that page.
     * - Otherwise, check the user's role:
     * - 'admin': Redirect to the Admin Dashboard.
     * - Standard user: Redirect to the Home Page.
     * 6. Error Handling: Catches 404 (User not found), 401 (Invalid password), or generic errors.
     * -------------------------------------------------------------------------
     */
    async function login() {
        try {
            // Step 1: Attempt login request
            const response = await axios.post(import.meta.env.VITE_API_URL + "/api/users/login", {  
                email : email,
                password : password
            });

            // Step 2: Persist authentication token
            localStorage.setItem("token", response.data.token);
            
            // Step 3: Notify user
            toast.success("Login successful!");

            // Step 4: Determine redirect destination
            const user = response.data.user;

            if(location.state && location.state.from){
                // Redirect back to the protected route they tried to access
                navigate(location.state.from);
            } else {
                // Role-based routing
                if(user.role == "admin"){
                    navigate("/admin"); 
                } else {
                    navigate("/"); 
                }
            }

        } catch(e) {
            // Step 5: Handle specific error codes
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
        /* Main Container: Full viewport height, flex layout, custom font and theme colors */
        <div className="w-full min-h-screen flex font-['Montserrat'] text-secondary bg-primary">
            
            {/* SECTION 1: Left Side - Artistic Visual & Branding 
                Hidden on mobile (lg:hidden), visible on large screens (lg:flex).
            */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[url(/src/assets/login.jpg)] bg-cover bg-center">
                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
                
                {/* Logo Placement */}
                <div className="absolute top-12 left-12 z-10">
                    <img src="/logo.png" alt="CBC Logo" className="w-28 drop-shadow-lg" />
                </div>

                {/* Hero Text Content */}
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

            {/* SECTION 2: Right Side - Authentication Form
                Centers content vertically and horizontally.
            */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 bg-white lg:bg-transparent">
                
                {/* Mobile-Only Logo Display */}
                <div className="lg:hidden mb-8">
                    <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center shadow-lg">
                        <img src="/logo.png" alt="CBC Logo" className="w-12" />
                    </div>
                </div>

                {/* Form Card Container */}
                <div className="w-full max-w-[480px] bg-white lg:shadow-2xl lg:shadow-secondary/10 rounded-[2rem] p-8 md:p-12 transition-all duration-300">
                    
                    {/* Header */}
                    <div className="mb-10">
                        <h1 className="text-3xl font-['Playfair_Display'] font-bold text-secondary mb-2">Welcome Back</h1>
                        <p className="text-secondary/60 font-medium text-sm">Enter your credentials to continue</p>
                    </div>

                    {/* Inputs Group */}
                    <div className="flex flex-col gap-8">
                        
                        {/* Material Input Field: Email */}
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
                            {/* Floating Label Animation Logic */}
                            <label 
                                htmlFor="email_field"
                                className="absolute text-sm text-secondary/50 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-accent peer-focus:font-semibold peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4"
                            >
                                Email Address
                            </label>
                        </div>

                        {/* Material Input Field: Password */}
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
                            {/* Floating Label Animation Logic */}
                            <label 
                                htmlFor="password_field"
                                className="absolute text-sm text-secondary/50 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-accent peer-focus:font-semibold peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4"
                            >
                                Password
                            </label>
                        </div>
                    </div>

                    {/* Helper Link: Forgot Password */}
                    <div className="flex justify-end mt-2 mb-6">
                        <span className="text-xs font-semibold text-secondary/70 hover:text-accent cursor-pointer transition-colors">
                            Forgot Password?
                        </span>
                    </div>

                    {/* Login Action Button */}
                    <button 
                        onClick={login} 
                        className="w-full h-[54px] bg-secondary text-white font-bold rounded-xl shadow-lg shadow-secondary/20 hover:bg-accent hover:shadow-accent/40 active:scale-[0.98] active:shadow-none transition-all duration-300 tracking-wide text-sm uppercase"
                    >
                        Login
                    </button>

                    {/* Divider */}
                    <div className="mt-8 flex items-center gap-4">
                        <div className="h-[1px] bg-secondary/10 flex-1"></div>
                        <span className="text-xs text-secondary/40 font-semibold uppercase">Or</span>
                        <div className="h-[1px] bg-secondary/10 flex-1"></div>
                    </div>

                    {/* Registration Link */}
                    <div className="text-center text-sm text-secondary/70 mt-8">
                        New to CBC? <span className="text-accent font-bold cursor-pointer hover:underline">Create Account</span>
                    </div>

                </div>
            </div>
        </div>
    )
}