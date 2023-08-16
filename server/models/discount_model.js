import mongoose from 'mongoose';


export const Schema_Discount = new mongoose.Schema({
    discountcode: {
        type: String,
    },
    discountpercent: {
        type: Number,
    },
});

export default mongoose.model('Discount', Schema_Discount);
