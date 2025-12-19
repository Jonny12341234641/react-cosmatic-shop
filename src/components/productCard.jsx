import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

/**
 * ProductCard Component
 * =============================================================================
 * A functional component that renders a single product card in a grid or list.
 * It features a hover animation, image scaling, and a direct link to the product details.
 * * Functional Steps:
 * 1. Destructures incoming properties (props) to extract product details.
 * 2. Applies default values to these properties to prevent errors if data is missing.
 * 3. Renders a card container with 'group' styling to coordinate hover effects on child elements.
 * 4. Displays the product image with a zoom-in effect on hover.
 * 5. Displays product details and a 'View Product' action button.
 * =============================================================================
 */
export default function ProductCard(props) {
  
  // Data Extraction & Validation:
  // We destructure the 'props' object to get specific values.
  // Default values (e.g., 'Product Name', '0.00') are assigned immediately.
  // This acts as a safety guard; if the parent component fails to pass data, 
  // the card will still render a placeholder instead of crashing.
  const { 
    id, 
    name = "Product Name", 
    price = "0.00", 
    img = "https://via.placeholder.com/300" 
  } = props;

  return (
    /* Card Container
       - group: Allows child elements (like the image) to react when this container is hovered.
       - relative: Establishes a positioning context.
       - hover:-translate-y-2: Moves the card slightly up on hover for a "floating" effect.
    */
    <div className="group relative w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 ease-in-out font-['Montserrat']">
      
      {/* 1. PRODUCT IMAGE SECTION 
          Contains the image within a fixed height container.
      */}
      <div className="w-full h-56 bg-primary overflow-hidden">
        {/* The image scales up (scale-110) when the parent 'group' is hovered.
           'object-cover' ensures the image fills the area without distortion.
        */}
        <img
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          src={img}
          alt={name}
        />
      </div>

      {/* 2. PRODUCT INFO SECTION 
          Contains the title, price, and action button.
      */}
      <div className="p-5">
        
        {/* Title
            'truncate' cuts off text with '...' if it exceeds one line.
        */}
        <h2 className="text-xl font-bold font-['Playfair_Display'] text-secondary truncate" title={name}>
          {name}
        </h2>
        
        {/* Price and Action Row */}
        <div className="flex justify-between items-center mt-3">
          
          {/* Price Display */}
          <p className="text-2xl font-bold text-accent">
            ${price}
          </p>
          
          {/* Action Button (Link)
              Constructs a dynamic URL path using the 'id' (e.g., /overview/123).
          */}
          <Link 
            to={"/overview/" + id} 
            className="flex items-center gap-2 bg-secondary text-white px-5 py-2.5 rounded-full shadow-md hover:bg-accent hover:shadow-lg transition-all duration-300 transform active:scale-95"
          >
            <FiShoppingCart />
            <span>View Product</span>
          </Link>

        </div>
      </div>
    </div>
  );
}