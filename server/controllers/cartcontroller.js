import product_model from '../models/product_model.js';
import cart_model from '../models/cart_model.js';


export async function addItem2Cart(req, res) {
    try {
        const { productId } = req.body;
        const user = req.user;
        if (!user) {
            return res.status(401).json({ error: 'You must be logged in' });
        }

        let cart = await cart_model.findOne({ userId: user._id });

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
            cart.products.push({ productId, quantity: 1, price: product.price, weight: product.weight });
        }

        cart.calculateTotal();
        await cart.save();

        return res.json(cart);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
}

export async function getCart(req, res) {

    const user = req.user;

    if (!user) {
        return res.status(401).json({ error: 'You must be logged in' });
    }

    let cart = await cart_model.findOne({ userId: user._id }).populate('products.productId');
    if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });

    }
    res.json(cart);
}


export async function deleteItemFromCart(req, res) {

    const user = req.user;
    const productId = req.params.productId;
    let cart = await cart_model.findOne({ userId: user._id }).populate('products.productId');

    if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
    }

    const products = cart.products.filter(product => product.productId._id.toString() !== productId);

    cart.products = products;

    cart.calculateTotal();

    await cart.save();

    res.json(cart);
}

export async function deleteAllItemsFromCart(req, res) {
    const user = req.user;

    if (!user) {
        return res.status(401).json({ error: 'You must be logged in' });
    }

    let cart = await cart_model.findOne({ userId: user._id }).populate('products.productId');

    if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
    }

    cart.products = [];

    cart.calculateTotal();

    await cart.save();

    res.json(cart);
}