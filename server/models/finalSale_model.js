import mongoose from 'mongoose';

const finalSaleSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    username: { type: String, required: true },
    usersurname: { type: String, required: true },
    usermail: { type: String, required: true },
    userphone: { type: String, required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, required: true },
    clientname: { type: String, required: true },
    clientphone: { type: String, required: true },
    clientmail: { type: String, required: true },
    clientaddress: { type: String, required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, required: true },
            productName: { type: String, required: true },
            productPrice: { type: Number, required: true },
            productWeight: {type: Number, required: true },
        }
    ],
    discountCode: { type: String },
    discountPercent: { type: Number },
    totalPrice: { type: Number, required: true },
    discountedPrice: { type: Number },
    status: { type: String, default:"waiting..." },
}, { timestamps: true });

const FinalSale = mongoose.model('FinalSale', finalSaleSchema);

export default FinalSale;
