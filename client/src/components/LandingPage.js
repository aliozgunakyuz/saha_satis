import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import '../styles/landingpage.css'
import defimg from '../assets/deafult_product_img.jpg'

import Layout from './Layout';
export default function Username() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedWeight, setSelectedWeight] = useState('all');

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

  const filteredProductsByWeight = selectedWeight === 'all'
  ? products
  : products.filter(product => product.weight.toString() === selectedWeight.toString());

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
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" disabled>
              Select a Category
            </option>
            <option value="all">All</option>
            {[...new Set(products.map((product) => product.category))]
            .sort() // Sort the categories alphabetically
            .map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          </div>
          
          <div className='text-center mb-10'>
          <label for="weight-dropdown text-custom-blue">Weight:</label>
          <select
            id="weight-dropdown"
            className="product-dropdown"
            onChange={(e) => setSelectedWeight(e.target.value)}
          >
            <option value="" disabled>
              Select Weight
            </option>
            <option value="all">All</option>
            {[...new Set(products.map((product) => product.weight))]
              .sort((a, b) => parseFloat(a) - parseFloat(b)) // Sort the weights in ascending order
              .map((weight, index) => (
                <option key={index} value={weight}>
                  {weight}gr
                </option>
              ))}
          </select>
          </div>
        </div>
        <div className='flex flex-wrap justify-center space-x-2 px-1'>
        {filteredProducts
          .filter(product => 
            filteredProductsByWeight.includes(product) || 
            (selectedWeight === 'all') // Include if "All" weight is selected
          )
          .map((product) => (
            
            <div
              key={product.id}
              className='p-6 rounded-lg flex flex-col items-center w-[280px]'
              style={{
                backgroundImage: 'linear-gradient(to bottom, #145728, transparent)',
              }}
            >
              <img
                src={product.productimage || defimg} 
                alt='product'
                className='mx-auto mb-2'
                width={120}
                height={120}
              />
              <h2 className='text-white font-semibold mb-1'>{product.productname}</h2>
              <p className='text-white mb-1'>{product.category}</p>
              <p className='text-white mb-1'>{product.weight}gr</p>
              <p className='text-white mb-1'>Stock: {product.stock}</p>
              <p className='text-white mb-1'>{product.price}₺</p>
              
              <div className='flex justify-center'>
                <button className='bg-custom-blue text-white font-semibold py-1 px-3 rounded hover:bg-white hover:text-[#145728]' onClick={() => addToCart(product._id)}>
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