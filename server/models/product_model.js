import mongoose from 'mongoose';


export const Schema_Product = new mongoose.Schema({
    productimage: {
        type: String,
        required: true,
        unique: false,
    },
    productname: {
        type: String,
        required: true,
        unique: true,
    },
    stock: {
        type: Number,
        required: true,
        unique: false,
    },
    price: {
        type: Number,
        required: true,
        unique: false,
    },
    weight: {
        type: Number,
        required: true,
        unique: false,
    },
    category: {
        type: String,
        required: true,
        unique: false,
    },

});

export default mongoose.model('Product', Schema_Product);
