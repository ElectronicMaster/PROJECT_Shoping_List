import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    link: {
        type: String,
        default: ""
    },
    userID: {
        type: String,
        required: true
    }
})

const Product = mongoose.model("Product",productSchema)
export default Product