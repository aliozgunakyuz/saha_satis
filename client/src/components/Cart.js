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
    const [clients, setClients] = useState([]);
    const [isValidDiscount, setIsValidDiscount] = useState(false);
    const [discountPercent, setDiscountPercent] = useState(null);
    const [selectedClientName, setSelectedClientName] = useState('');
    
    let discountmessage = "Discount code does not entered";


    const removeFromCart = async (productIds) => {
        try {
            service.delete(`/api/cleancart`)
            fetchCart();
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const updateProductStock = async (productId, newStock) => {
        try {
            await axios.put(`/api/stockupdate/${productId}`, {
                stock: newStock
            });
        } catch (error) {
            console.error(`Error updating stock for product ${productId}:`, error);
        }
    };

    const handleCheckout = async () => {
        if (cart.products.length === 0) {
            return;
        }
        const productExceedsStock = cart.products.some(product => product.quantity > product.productId.stock);
        const productsExceedingStock = cart.products.filter(product => product.quantity > product.productId.stock);

        if (productsExceedingStock.length > 0) {
            const productsInfo = productsExceedingStock.map(product => {
                return `${product.productId.productname} (Available Stock: ${product.productId.stock})`;
            }).join(', ');
            alert(`The following products in your cart exceed available stock: ${productsInfo}. Please adjust quantities.`);
            return;
        } else {

            const confirmed = window.confirm("Are you sure you want finish sale process? This will remove all items from your cart.");

            const productIdsToRemove = cart.products.map(product => product.productId._id);

            if (confirmed) {
        
                const selectedClient = clients.find((client) => client.clientname === selectedClientName);
            
                const finalSaleData = {
                    userID: apiData.userId,
                    username: apiData.name,
                    usersurname: apiData.surname,
                    usermail: apiData.mail,
                    userphone: apiData.phone,
                    clientId: selectedClient._id,
                    clientname: selectedClient.clientname,
                    clientphone: selectedClient.clientphone,
                    clientmail: selectedClient.clientmail,
                    clientaddress: selectedClient.clientaddress,
                    products: cart.products.map((product) => ({
                        productId: product.productId,
                        productName: product.productId.productname,
                        productCategory: product.productId.category,
                        productQuantity: product.quantity,
                        productPrice: product.price,
                        productWeight: product.weight,
                    })),
                    discountCode: isValidDiscount ? document.getElementById('discount-code').value : 'No Discount',
                    discountPercent: isValidDiscount ? discountPercent : 0,
                    totalPrice: cart.carttotal,
                    discountedPrice: isValidDiscount ? cart.carttotal - (cart.carttotal * discountPercent / 100) : '',
                    status: 'waiting...',
                };
            
                try {
                    for (const product of cart.products) {
                        const updatedStock = product.productId.stock - product.quantity;
                        await updateProductStock(product.productId._id, updatedStock);
                    }

                    await axios.post('/api/save-final-sale', finalSaleData , {
                        headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },});
                        console.log(productIdsToRemove);
                        await removeFromCart(productIdsToRemove)
                        fetchCart();
                } catch (error) {
                    console.error('Error saving final sale:', error);
                }
            };
    };
        
    };
    
    const checkDiscountCode = async () => {
        const discountCode = document.getElementById('discount-code').value;
        if (discountCode === null || discountCode === '') {
            return;
        }
        try {
            const response = await axios.get(`/api/check-discount/${discountCode}`);
            setIsValidDiscount(response.data.isValid);
            if (response.data.isValid) {
                setDiscountPercent(response.data.discountPercent);
            } else {
                setDiscountPercent(null);
            }
        } catch (error) {
            console.error('Error checking discount code:', error);
        }
    };

    useEffect(() => {
        axios.get('/api/getclients')
            .then((response) => {
                setClients(response.data); 
            })
            .catch((error) => {
                console.error('Error fetching clients:', error);
        });
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

    const removeFromCart2 = async (productId) => {
        const confirmed2 = window.confirm("Are you sure you want finish sale process? This will remove all items from your cart.");
        if(confirmed2){
            try {
                await service.delete(`/api/cart/${productId}`);
                fetchCart();
            } catch (error) {
                console.error('Error removing from cart:', error);
            }
        }
    };

    const increaseQuantity = async (productId) => {
        try {
          await service.put(`/api/quantityincrease/${productId}`);;
          fetchCart();
        } catch (error) {
          console.error("An error occurred:", error);
        }
      };

      const decreaseQuantity = async (productId) => {
        try {
          await service.put(`/api/quantitydecrease/${productId}`);;
          fetchCart();
        } catch (error) {
          console.error("An error occurred:", error);
        }
      };

    return (
        <Layout>
            <div className="cart-container">
                <h2 className="cart-header">{apiData.name} {apiData.surname}'s Cart</h2>
                <ul className="cart-list">
                    {cart.products.map((product) => (
                        <li key={product._id} className="cart-item">
                            <div className="product-info bg-custom-blue rounded-lg">
                                <div>
                                    <label htmlFor="productimage">
                                        <img src={product.productId.productimage}
                                            alt={product.productId.productname}
                                            className="product-image" />
                                    </label>
                                </div>
                            </div>
                            <div className="product-name">{product.productId.productname}</div>
                            <div className="product-quantity">{product.weight}gr</div>
                            <button onClick={() => decreaseQuantity(product.productId._id)}><b>-</b></button>
                            <div className="product-quantity">{product.quantity}</div>
                           
                            <button onClick={() => increaseQuantity(product.productId._id)}><b>+</b></button>
                            <div className="product-quantity">{product.price*product.quantity}₺</div>
                            <button className="remove-button" onClick={() => removeFromCart2(product.productId._id,product.productId.productname,product.weight,product.quantity)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
                <label for="client-dropdown">Select a Client:</label>
                <select
                    id="client-dropdown"
                    className="client-dropdown"
                    value={selectedClientName}
                    onChange={(e) => setSelectedClientName(e.target.value)}
                >
                    <option value="" disabled>
                        Select a Client
                    </option>
                    {clients.map((client) => (
                        <option value={client.clientname} key={client._id}>
                            {client.clientname}
                        </option>
                    ))}
                </select>
                    <div className="discount-input-container">
                        <input
                            type="text"
                            id="discount-code"
                            className="additional-info"
                            placeholder="Discount Code (Optional)"
                        />
                        <button className="apply-button" onClick={checkDiscountCode}>
                            Apply Discount
                        </button>
                    </div>
                    
                    {isValidDiscount ? <p>Valid discount code applied! Discount: {discountPercent}%</p> : <p>{discountmessage}</p>}
                    {isValidDiscount ? <p className='cart-total'>
                        Total: {cart.carttotal.toFixed(2)} / Discounted Total: {(cart.carttotal - (cart.carttotal * discountPercent / 100)).toFixed(2)}₺
                    </p> : <p className='cart-total'>Total: {cart.carttotal.toFixed(2)} </p> }
                <div>
                    <button className={`checkout-button ${!selectedClientName ? 'disabled-button' : ''}`} onClick={handleCheckout} disabled={!selectedClientName}>CHECKOUT</button>
                </div>
            </div>
        </Layout>
    );
}

export default Cart;