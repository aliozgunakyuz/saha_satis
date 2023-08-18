import cart_model from '../models/cart_model.js';
import product_model from '../models/product_model.js';


export async function addItem2Cart(req,res){
    console.log('addItem2Cart function called');
    try {
        const { productId } = req.body;
        const user = req.user;

        if (!user) {
            return res.status(401).json({ error: 'You must be logged in' });
        }

        const cart = await cart_model.findById( user._id );

        if (!cart) {
            cart = new cart_model({ userId: user._id });
        }

        const existingProductIndex = cart.products.findIndex(product => product.productId.toString() === productId);
        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity++;
        } else {
            const product = await product_model.findById(productId);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            cart.products.push({ productId, quantity: 1 });
        }

        cart.calculateTotal();
        await cart.save();

        return res.json(cart);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
}