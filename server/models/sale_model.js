import mongoose from 'mongoose';

export const Schema_Sale = new mongoose.Schema({
    salesmanID: {
        type: String,
        required: true,
    },
    clientID: {
        type: String,
        required: true,
    },
    cartID: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
    },
    finalprice: {
        type: Number,
        required: true,
    },
    status:{
        type: String, 
        default:'waiting...',
    },
},{timestamps: true});

export default mongoose.model('Sale', Schema_Sale);
