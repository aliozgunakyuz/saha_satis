import mongoose from 'mongoose';


export const Schema_Cart = new mongoose.Schema({
    cartproducts: {
        type: String,
        value: [String],
    },
    carttotal: {
        type: Number,
    },
});

export default mongoose.model('Cart', Schema_Cart);
