import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../styles/landingpage.css'

import mainscreencheese from '../assets/mainscreencheese.png';
import Layout from './Layout';
export default function Username() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const addToCart = async (productId) => {
    try {
      const response = await axios.post('/api/addtocart', { productId }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCart(response.data.products);
      toast.success('Product added to cart');
    } catch (error) {
      toast.error('Error adding product to cart. Please try again.');
    }
  };
  useEffect(() => {
    axios.get('/api/getproducts')
      .then((response) => {
        const sortedProducts = response.data.sort((a, b) => a.productname.localeCompare(b.productname));
        setProducts(sortedProducts);
      })
      .catch((error) => {
        toast.error('Error fetching products please try again later. Error: ' + error)
      });
  }, []);

  const filteredProducts = selectedCategory === 'all'
  ? products
  : products.filter(product => product.category === selectedCategory);

  return (
    <>
      <Layout>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        
        <div className='flex justify-center items-center flex-col pb-4'>
          <p></p>
          <h1 className='text-custom-blue text-4xl lg:text-5xl md:text-4xl sm:text-3xl xsm:text-2xl font-bold'>
            Ürünlerimiz
          </h1>
          <p></p>
        </div>
        <div className='flex flex-row justify-center menu-container'>
          <div className='text-center mb-10'>
          <label for="client-dropdown text-custom-blue">Category:</label>
            <select
            id="category-dropdown"
            className="product-dropdown"
            onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="" disabled>
                Select a Category
              </option>
              <option>All</option>
            {products.map((product) => (
              <option value='all'>{product.category}</option>
              ))}
            </select>
          </div>
          
          <div className='text-center mb-10'>
          <label for="weight-dropdown text-custom-blue">Weight:</label>
            <select
            id="weight-dropdown"
            className="product-dropdown">
              <option value="" disabled>
                        Select Weight
              </option>
              <option>All</option>
            {products.map((product) => (
              <option value='all'>{product.weight}gr</option>
              ))}
            </select>
          </div>
        </div>
        <div className='flex flex-wrap justify-center space-x-4'>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className='p-6 rounded-lg'
              style={{
                backgroundImage: 'linear-gradient(to bottom, #164663, transparent)',
              }}
            >
              <img
                src={product.productimage}
                alt='product'
                className='mx-auto mb-2'
                width={120}
                height={120}
              />
              <h2 className='text-white font-semibold mb-1'>{product.productname}</h2>
              <p className='text-white mb-1'>Price: {product.price}₺</p>
              <p className='text-white mb-1'>Category: {product.category}</p>
              <div className='flex justify-center'>
                <button className='bg-custom-blue text-white font-semibold py-1 px-3 rounded hover:bg-white hover:text-blue-950' onClick={() => addToCart(product._id)}>
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    </>
  )
}