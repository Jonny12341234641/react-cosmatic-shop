import { FiCheck, FiHeart, FiGlobe, FiUsers } from "react-icons/fi"; 

/**
 * AboutPage Component
 * =============================================================================
 * The main layout for the "About Us" page of the application.
 * This component is structured into four distinct vertical sections:
 * 1. Hero: Branding and introduction.
 * 2. Mission: Split-layout explaining the brand values.
 * 3. Stats: Key performance indicators displayed in a floating card.
 * 4. Team: A grid display of key personnel.
 * =============================================================================
 */
export default function AboutPage() {
  return (
    /* Main Page Container
      - w-full min-h-screen: Ensures full viewport coverage.
      - bg-primary: Applies the theme's main background color.
      - overflow-x-hidden: Prevents horizontal scrollbars caused by decorative elements.
    */
    <div className="w-full min-h-screen bg-primary overflow-x-hidden pb-20">
      
      {/* SECTION 1: HERO & INTRO
        Centers content vertically and horizontally within 60% of the viewport height.
      */}
      <section className="relative w-full h-[60vh] flex flex-col justify-center items-center text-center px-6">
        
        {/* Background Decorative Element 
          - Uses absolute positioning to sit behind the text (-z-10).
          - blur-[100px]: Creates a soft, ambient glow effect.
        */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/40 rounded-full blur-[100px] -z-10"></div>
        
        {/* Subtitle / Tagline */}
        <span className="text-accent font-bold tracking-[0.2em] uppercase mb-4 text-sm animate-fade-in-up">
            Our Story
        </span>
        
        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-['Playfair_Display'] font-bold text-secondary mb-6 leading-tight">
          Beauty Rooted <br/> in <span className="italic text-accent">Nature.</span>
        </h1>
        
        {/* Introductory Paragraph */}
        <p className="font-['Montserrat'] text-secondary/70 text-lg max-w-2xl leading-relaxed">
          We believe that true radiance comes from the earth. 
          Crystal Beauty Cosmetics bridges the gap between ancient botanical wisdom 
          and modern skincare science.
        </p>
      </section>

      {/* SECTION 2: THE MISSION (Split Layout)
        Uses Flexbox to create a responsive two-column layout (Stack on mobile, Row on Desktop).
      */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="flex flex-col md:flex-row items-center gap-16">
            
            {/* Column A: Visual Content */}
            <div className="flex-1 relative">
                {/* Image Container with rotation and border styling */}
                <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl shadow-gray-400/20 border-8 border-white transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                    <img 
                        src="https://images.unsplash.com/photo-1556228720-1987dc794271?q=80&w=1000&auto=format&fit=crop" 
                        alt="Lab and Nature" 
                        className="w-full h-[500px] object-cover"
                    />
                </div>
                {/* Decorative background outline box (Hidden on small screens) */}
                <div className="absolute -bottom-6 -right-6 w-full h-full border-4 border-accent/20 rounded-[2rem] -z-0 hidden md:block"></div>
            </div>

            {/* Column B: Text Content */}
            <div className="flex-1 space-y-8">
                <h2 className="text-4xl font-['Playfair_Display'] font-bold text-secondary">
                    Not just a brand, <br/> but a <span className="underline decoration-accent decoration-4 underline-offset-4">Movement.</span>
                </h2>
                <p className="font-['Montserrat'] text-secondary/70 leading-7 text-justify">
                    Founded in 2024, Crystal Beauty began with a simple question: 
                    <i>Why choose between effective and natural?</i> 
                    We spent years formulating blends that don't just sit on your skin 
                    but nourish it from within.
                </p>
                
                {/* Features Grid: 2x2 Layout for checklist items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div className="flex items-center gap-3 font-medium text-secondary">
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent"><FiCheck/></div>
                        Cruelty-Free
                    </div>
                    <div className="flex items-center gap-3 font-medium text-secondary">
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent"><FiCheck/></div>
                        Ethically Sourced
                    </div>
                    <div className="flex items-center gap-3 font-medium text-secondary">
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent"><FiCheck/></div>
                        Dermatologist Tested
                    </div>
                    <div className="flex items-center gap-3 font-medium text-secondary">
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent"><FiCheck/></div>
                        Zero-Waste Packaging
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* SECTION 3: STATS CARD
        A floating container displaying key metrics.
      */}
      <section className="w-full px-6 py-20">
        <div className="max-w-6xl mx-auto bg-secondary rounded-[3rem] p-12 md:p-16 shadow-2xl flex flex-col md:flex-row justify-around items-center gap-12 text-center text-primary">
            <StatItem number="10k+" label="Happy Customers" icon={<FiUsers className="text-3xl mb-2"/>} />
            
            {/* Vertical Divider (becomes horizontal on mobile) */}
            <div className="w-24 h-[1px] bg-white/20 md:w-[1px] md:h-24"></div>
            
            <StatItem number="100%" label="Organic Ingredients" icon={<FiHeart className="text-3xl mb-2"/>} />
            
            {/* Vertical Divider */}
            <div className="w-24 h-[1px] bg-white/20 md:w-[1px] md:h-24"></div>
            
            <StatItem number="15+" label="Awards Won" icon={<FiGlobe className="text-3xl mb-2"/>} />
        </div>
      </section>

      {/* SECTION 4: TEAM GRID
        Displays team members in a responsive 3-column grid.
      */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl font-['Playfair_Display'] font-bold text-secondary mb-12">Meet the Experts</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <TeamMember 
                name="Sarah Jenkins" 
                role="Founder & CEO" 
                img="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" 
            />
            <TeamMember 
                name="Dr. Ali Hassan" 
                role="Head Dermatologist" 
                img="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80" 
            />
            <TeamMember 
                name="Elena Rodriguez" 
                role="Product Formulator" 
                img="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" 
            />
        </div>
      </section>

    </div>
  );
}

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

/**
 * StatItem Component
 * -----------------------------------------------------------------------------
 * Displays a single statistic with an icon, large number, and label.
 * Used within the Stats Section.
 * * @param {string} number - The statistic value (e.g., "10k+").
 * @param {string} label - The description of the statistic.
 * @param {ReactNode} icon - The icon component to display.
 */
function StatItem({ number, label, icon }) {
    return (
        <div className="flex flex-col items-center">
            <div className="text-accent">{icon}</div>
            <h3 className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] mb-2">{number}</h3>
            <p className="text-white/60 font-['Montserrat'] tracking-wide">{label}</p>
        </div>
    )
}

/**
 * TeamMember Component
 * -----------------------------------------------------------------------------
 * A card component representing a team member.
 * Features a hover effect where the card lifts and the image scales slightly.
 * * @param {string} name - Full name of the team member.
 * @param {string} role - Job title.
 * @param {string} img - URL for the profile image.
 */
function TeamMember({ name, role, img }) {
    return (
        <div className="group bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            {/* Image Container with overflow hidden for zoom effect */}
            <div className="w-full h-64 overflow-hidden rounded-2xl mb-6">
                <img 
                    src={img} 
                    alt={name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>
            <h3 className="text-xl font-bold text-secondary font-['Playfair_Display']">{name}</h3>
            <p className="text-accent font-medium text-sm mt-1 uppercase tracking-wider">{role}</p>
        </div>
    )
}