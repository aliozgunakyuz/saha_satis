import cart_model from '../models/cart_model.js';
import product_model from '../models/product_model.js';


export async function addItem2Cart(req,res){
    console.log('addItem2Cart function called');
    try {
        const { productId } = req.body;
        const cart = await cart_model.findOne({ userId: req.user._id }); 

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
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

