import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/cartstyles.css';
import service from '../service';
import Layout from './Layout';
import '../styles/landingpage.css'
import useFetch from '../hoooks/hookk.js';
import { useAuthStore } from '../store/store.js';



function Cart() {
    const [cart, setCart] = useState({ products: [], carttotal: 0 });
    const mail = useAuthStore((state) => state.auth.mail);
    const [{ isLoading, apiData, serverError }, setData] = useFetch(mail);

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
        <Layout>
            <div className="cart-container w-100">
                <h2 className="cart-header">{apiData.name} {apiData.surname}'s Cart</h2>
                <ul className="cart-list">
                    {cart.products.map((product) => (
                        <li key={product._id} className="cart-item">
                            <div className="product-info bg-custom-blue rounded-lg">
                                <div>
                                    <img src={product.productId.productimage} alt={product.productId.productname} className="product-image" />
                                </div>
                            </div>
                            <div className="product-name">{product.productId.productname}</div>
                            <div className="product-quantity">Quantity: {product.quantity}</div>
                            <div className="product-quantity">{product.price}₺</div>
                            <button className="remove-button" onClick={() => removeFromCart(product.productId._id)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
                <p className="cart-total">Total: ${cart.carttotal}</p>
            </div>
        </Layout>
    );
}

export default Cart;