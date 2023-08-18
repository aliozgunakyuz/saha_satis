import React, {useState, useEffect} from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import '../styles/landingpage.css'

import mainscreencheese from '../assets/mainscreencheese.png';
import Layout from './Layout';


export default function Username() {

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const addToCart = async (productId) => {
    try {
      const response = await axios.post('/api/addtocart',{ productId });
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
        toast.error('Error fetching products please try again later. Error: '+ error)
      });
  }, []);

  return (
    <>
      <Layout>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className='text-center mb-10'>
          <p></p>
          <h1 className='text-custom-blue text-4xl lg:text-5xl md:text-4xl sm:text-3xl xsm:text-2xl font-bold'>
            Ürünlerimiz
          </h1>
        </div>
        <div className='flex flex-wrap justify-center space-x-4'>
          {products.map((product) => (
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
              <button className='bg-custom-blue text-white font-semibold py-1 px-3 rounded hover:bg-white hover:text-blue-950' onClick={() => addToCart(product.id)}>
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
