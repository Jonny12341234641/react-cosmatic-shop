import mongoose from "mongoose";

const productSchema = new mongoose.Schema( 
    {
        productID : {
            type : String,
            required : true,
            unique : true
        },
        name : {
            type : String,
            required : true
        },
        altNames : {
            type : [String],
            type : String,
            required : true
        },
        description : {
            type : String,
            required : true
        },
        price : {
            type : Number,
            required : true
        },
        labelledPrice : {
            type : Number,
            required : true
        },
        category :  {
            type : String,
            required : true
        }
    }
)

const Product = mongoose.model("Product", productSchema) //creating a model
export default Product;