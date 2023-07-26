import mongoose from 'mongoose';

export const Schema_Product = new mongoose.Schema({
    productname: {
        type: String,
        required: true,
        unique: true,
    },
    stock: {
        type: String,
        required: true,
        unique: false,
    },
    price: {
        type: String,
        required: true,
        unique: false,
    },
    color: {
        type: String,
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
