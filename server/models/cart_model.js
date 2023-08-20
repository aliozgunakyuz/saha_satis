import mongoose from 'mongoose';

const cartProductSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    price: {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
});

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [cartProductSchema],
    carttotal: {
        type: mongoose.Schema.Types.Number,
        default: 0,
    },
});

cartSchema.methods.calculateTotal = function () {
    this.carttotal = this.products.reduce((total, product) => {
        console.log("product: ", product);
        return total + (product.quantity * product.price);
    }, 0);
};

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;