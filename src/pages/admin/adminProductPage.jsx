import axios from "axios"
import { useState } from "react"


const sampleProducts = [
    {
        productID: "ELEC-001",
        name: "Wireless Noise Cancelling Headphones",
        altNames: ["Bluetooth Headset", "Over-ear Headphones", "Travel Audio Gear"],
        description: "Premium over-ear headphones with 30-hour battery life and active noise cancellation.",
        price: 89.99,
        labelledPrice: 120.00,
        category: "Electronics"
    },
    {
        productID: "HOME-045",
        name: "Ceramic Coffee Mug Set",
        altNames: ["Tea Cup Set", "Kitchen Mugs", "Gift Set"],
        description: "Set of 4 minimalist white ceramic mugs, microwave and dishwasher safe.",
        price: 25.50,
        labelledPrice: 35.00,
        category: "Home & Kitchen"
    },
    {
        productID: "GMNG-77",
        name: "RGB Mechanical Keyboard",
        altNames: ["Gaming Keyboard", "Clicky Keyboard", "PC Accessory"],
        description: "Backlit mechanical keyboard with blue switches for tactile feedback.",
        price: 45.00,
        labelledPrice: 60.00,
        category: "Computers"
    },
    {
        productID: "FIT-102",
        name: "Yoga Mat - Extra Thick",
        altNames: ["Exercise Mat", "Gym Mat", "Non-slip Mat"],
        description: "6mm thick eco-friendly foam mat with carrying strap included.",
        price: 15.99,
        labelledPrice: 20.00,
        category: "Fitness"
    },
    {
        productID: "CLTH-559",
        name: "Men's Cotton Polo Shirt",
        altNames: ["Casual Shirt", "Collared Tee", "Summer Wear"],
        description: "Breathable 100% cotton polo shirt available in navy blue.",
        price: 18.00,
        labelledPrice: 25.00,
        category: "Clothing"
    }
];

export default function AdminProductPage() {

    const [products, setProducts] = useState([sampleProducts]);

    // axios.get(import.meta.env.VITE_API_URL + "/api/products").then(
    //     (response) => {
    //         console.log(response.data)
    //         setProducts(response.data)
    //     }
    // ).catch(
    //     (error) => {
    //         console.log(error)
    //     }
    // )

    console.log(products);

    return (
        <div className="w-full h-full ">
            sample product page
        </div>
    )
}