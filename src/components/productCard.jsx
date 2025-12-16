import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";


export default function ProductCard(props) {
  // Use default values for props to prevent errors if they are not provided
  const { id, name = "Product Name", price = "0.00", img = "https://via.placeholder.com/300" } = props;

  return (
    <div className="group relative w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 ease-in-out font-['Montserrat']">
      
      {/* Product Image */}
      <div className="w-full h-56 bg-primary overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          src={img}
          alt={name}
        />
      </div>

      {/* Product Info */}
      <div className="p-5">
        <h2 className="text-xl font-bold font-['Playfair_Display'] text-secondary truncate" title={name}>
          {name}
        </h2>
        
        <div className="flex justify-between items-center mt-3">
          <p className="text-2xl font-bold text-accent">
            ${price}
          </p>
          
          <Link to={"/overview/" + id} className="flex items-center gap-2 bg-secondary text-white px-5 py-2.5 rounded-full shadow-md hover:bg-accent hover:shadow-lg transition-all duration-300 transform active:scale-95">
            <FiShoppingCart />
            <span>View Product</span>
          </Link>
        </div>
      </div>
    </div>
  );
}