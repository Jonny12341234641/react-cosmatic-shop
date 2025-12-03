import "./productCard.css"

export default function ProductCard(props){

    console.log(props.price);
    console.log("This is a product card");

    return(
        <div className="productCard">
            <h1>{props.name}</h1>
            <p>{props.price}</p>
            <img 
                className="productImage"
                src={props.img} 
            />
            <button>Add to Cart</button>
        </div>
    )
}