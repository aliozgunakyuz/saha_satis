import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/cartstyles.css';
import service from '../service';

function Cart() {
    const [cart, setCart] = useState({ products: [], carttotal: 0 });

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await service.get('/api/cart');
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await service.delete(`/api/cart/${productId}`);
            fetchCart();
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    return (
        <div className="cart-container">
            <h2 className="cart-header">Your Cart</h2>
            <ul className="cart-list">
                {cart.products.map((product) => (
                    <li key={product._id} className="cart-item">
                        <div className="product-info">
                            <img src={product.productId.image} alt={product.productId.name} className="product-image" />
                            <div className="product-name">{product.productId.name}</div>
                        </div>
                        <div className="product-quantity">Quantity: {product.quantity}</div>
                        <button className="remove-button" onClick={() => removeFromCart(product.productId._id)}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            <p className="cart-total">Total: ${cart.carttotal}</p>
        </div>
    );
}

export default Cart;
