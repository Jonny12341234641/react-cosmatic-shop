import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Loader } from "../components/loader";
import ImageSlider from "../components/imageSlider";

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
                            <h1 className="text-2xl font-['Playfair_Display'] font-bold">{product.name}</h1>
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