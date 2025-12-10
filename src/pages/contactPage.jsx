import { useState } from "react";
import { FiMapPin, FiPhone, FiMail, FiSend } from "react-icons/fi"; // Ensure react-icons is installed
import toast from "react-hot-toast";

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-primary px-4 md:px-12 py-12 pb-24">
      
      {/* 1. HEADER SECTION */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-accent font-bold tracking-widest uppercase text-sm">
            Get in Touch
        </span>
        <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-secondary mt-4 mb-6">
            We're here to <span className="italic text-accent">help.</span>
        </h1>
        <p className="font-['Montserrat'] text-secondary/70 text-lg">
            Have a question about our ingredients, shipping, or just want to say hello? 
            Our team is ready to assist you.
        </p>
      </div>

      {/* 2. CONTACT INFO CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
        <ContactCard 
            icon={<FiMail />} 
            title="Email Us" 
            detail="hello@crystalbeauty.com" 
            sub="We reply within 24 hours"
        />
        <ContactCard 
            icon={<FiPhone />} 
            title="Call Us" 
            detail="+1 (555) 123-4567" 
            sub="Mon-Fri, 9am - 6pm EST"
        />
        <ContactCard 
            icon={<FiMapPin />} 
            title="Visit Us" 
            detail="123 Blossom Avenue" 
            sub="New York, NY 10012"
        />
      </div>

      {/* 3. THE FORM SECTION */}
      <div className="w-full max-w-6xl mx-auto bg-white rounded-[2rem] shadow-xl shadow-gray-200 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Left Side: Visual/Image */}
        <div className="w-full md:w-5/12 relative bg-secondary">
            <img 
                src="https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?q=80&w=1000&auto=format&fit=crop" 
                alt="Contact Visual" 
                className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 to-transparent flex flex-col justify-end p-12">
                <h3 className="text-white text-3xl font-['Playfair_Display'] font-bold mb-4">
                    Visit our Flagship Store
                </h3>
                <p className="text-white/80 font-['Montserrat']">
                    Experience our products in person and get a free skin consultation.
                </p>
            </div>
        </div>

        {/* Right Side: The Form */}
        <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center">
            <ContactForm />
        </div>

      </div>
    </div>
  );
}

// --- SUB-COMPONENT: Contact Info Card ---
function ContactCard({ icon, title, detail, sub }) {
    return (
        <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group text-center border border-transparent hover:border-accent/20">
            <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center text-accent text-2xl mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-secondary font-['Playfair_Display'] mb-2">
                {title}
            </h3>
            <p className="text-secondary font-semibold mb-1 font-['Montserrat']">{detail}</p>
            <p className="text-gray-400 text-sm font-['Montserrat']">{sub}</p>
        </div>
    )
}

// --- SUB-COMPONENT: The Interactive Form ---
function ContactForm() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    function handleSubmit(e) {
        e.preventDefault();
        // Here you would typically send data to backend
        console.log(formData);
        
        // Show success message
        toast.success("Message sent successfully!");
        
        // Reset form
        setFormData({ name: "", email: "", message: "" });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-['Playfair_Display'] font-bold text-secondary mb-6">Send us a message</h2>
            
            <div className="space-y-1">
                <label className="text-sm font-bold text-secondary font-['Montserrat']">Full Name</label>
                <input 
                    required
                    type="text" 
                    placeholder="e.g. Jane Doe"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-accent focus:bg-white transition-all font-['Montserrat']"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
            </div>

            <div className="space-y-1">
                <label className="text-sm font-bold text-secondary font-['Montserrat']">Email Address</label>
                <input 
                    required
                    type="email" 
                    placeholder="e.g. jane@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-accent focus:bg-white transition-all font-['Montserrat']"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
            </div>

            <div className="space-y-1">
                <label className="text-sm font-bold text-secondary font-['Montserrat']">Your Message</label>
                <textarea 
                    required
                    rows="4"
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-accent focus:bg-white transition-all resize-none font-['Montserrat']"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
            </div>

            <button 
                type="submit" 
                className="w-full py-4 bg-secondary text-white font-bold rounded-xl shadow-lg hover:bg-accent hover:shadow-orange-500/30 transition-all duration-300 flex justify-center items-center gap-2 transform active:scale-[0.98]"
            >
                <FiSend />
                Send Message
            </button>
        </form>
    )
}