import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../components/loader";
import ImageSlider from "../components/imageSlider";
import { loadCart, addToCart } from "../utilities/cart";


export default function ProductOverview() {

    const params = useParams();

    const [status, setStatus] = React.useState("loading");
    const [product, setProduct] = React.useState(null);

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + "/api/products/" + params.id).then((res) => {
            setProduct(res.data);
            console.log(res.data);
            setStatus("loaded");
            toast.success("Product details loaded");
        }).catch((err) => {
            toast.error("Error fetching product details");
            console.log(err);
            setStatus("error");
        });
    }, []);

    return (
        <div className="w-full h-[calc(100vh-100px)] text-secondary"  >
            {
                status === "loading" && <Loader></Loader>
            }
            {
                status === "loaded" && (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="w-[50%] h-full flex items-center justify-center">
                            <ImageSlider images = {product.images}>
                            </ImageSlider>
                        </div>
                        <div className="w-[50%] h-full flex flex-col items-center gap-4 p-10 ">
                            <span className="">{product.productID}</span>
                            <h1 className="text-2xl font-['Playfair_Display'] font-bold text-center">{product.name}
                                {
                                    product.altNames.map(
                                        (altName, index) => {
                                            return (
                                                <span key={index} className="text-sm font-['Playfair_Display'] font-normal">  {" | " + altName} </span>
                                            )
                                        }
                                    )
                                }
                            </h1>
                            {/*product description*/}
                            <p className="mt-[30px] text-lg font-['Montserrat'] text-justify">{product.description}</p>
                            {/*product category*/}
                            <span className="mt-auto text-md font-['Montserrat']">Category: {product.category}</span>
                            {/*product price*/}
                            {
                                product.labelledPrice>product.price ?
                                <div className="flex items-center gap-4">
                                    <span className="text-3xl font-['Playfair_Display'] font-bold text-accent">${product.labelledPrice.toFixed(2)}</span>
                                    <span className="text-xl font-['Montserrat'] line-through text-gray-500">${product.price.toFixed(2)}</span>
                                </div>
                                :
                                <span className="text-3xl font-['Playfair_Display'] font-bold text-accent">${product.price.toFixed(2)}</span>
                            }

                            <div className="w-full h-[40px] flex gap-4">
                                {/*add a hover effect to the add to cart button*/}
                                <button 
                                    onClick={() => {
                                        console.log(loadCart(product));
                                        addToCart(product, 1);
                                        toast.success("Added " + product.name + " to cart");
                                    }}
                                    className="w-full h-full bg-accent text-white font-['Montserrat'] font-bold rounded hover:bg-transparent hover:border-2 hover:border-dark transition hover:text-black">Add to Cart
                                </button>
                                <Link
                                    to="/checkout"
                                    state={[{
                                        images: product.images,
                                        name: product.name,
                                        price: product.price,
                                        productID: product.productID,
                                        labelledPrice: product.labelledPrice,
                                        quantity: 1
                                    }]} 
                                    onClick={() => {
                                        console.log(loadCart(product));
                                        toast.success("Buying " + product.name);
                                    }}
                                    className="w-full h-full border-2 border-accent text-accent font-['Montserrat'] font-bold rounded hover:bg-accent hover:text-white transition">Buy Now
                                </Link>
                            </div>

                        </div>
                    </div>
                )
            }
            {
                status === "error" && 
                <div className="w-full min-h-screen flex items-center justify-center text-3xl text-red-500">
                    <h1>Error fetching product details</h1>
                </div>
            }
        </div>
    );
}