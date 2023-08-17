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

  useEffect(() => {
    axios.get('/api/getproducts')
      .then((response) => {
        const sortedProducts = response.data.sort((a, b) => a.productname.localeCompare(b.productname));
        setProducts(sortedProducts);
      })
      .catch((error) => {
        toast.error('Error fetching products please try again later. Error: '+error)
      });
  }, []);


  function userLogout(){
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <>
      <Layout>
      <div >
        
        <div className='relative h-auto w-auto flex flex-col'>
          <div className='bg-theme clip-path h-[85vh] lg:h-[75vh] md:h-[65vh] sm:h-[55vh] w-auto absolute top-0 left-0 right-0 opacity-100 z-10'></div>
          
            <div className='relative opacity-100 z-20 grid items-center justify-items-center item-container'>
              <div className='grid items-center justify-items-center mt-28 ms:mt-24'>
                <h1 className='text-6xl lg:text-5xl md:text-4xl sm:text-3xl xsm:text-2xl font-extrabold filter drop-shadow-sm text-custom-blue '>Hoşgeldiniz</h1>
                <h1 className='text-6xl lg:text-5xl md:text-4xl sm:text-3xl xsm:text-2xl font-extrabold filter drop-shadow-sm text-custom-blue'>Aşağı kaydırarak ürünlerimiz görebilirsiniz</h1>
                <div className='flex items-center'>
                  <img
                    src={mainscreencheese}
                    alt='maincheeseimg'
                    className='w-auto h-[45vh] lg:h-[35vh] md:h-[31vh] sm:h-[21vh] xsm:h-[19vh] transitions-theme -rotate-[25deg] hover:rotate-0 cursor-pointer object-fill' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='text-center mb-10'>
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
              <button className='bg-custom-blue text-white font-semibold py-1 px-3 rounded hover:bg-white hover:text-blue-950'>
                Sepete Ekle
              </button>
            </div>
          </div>
          ))}
        </div>
        </Layout>  
    </>
    

  )
}
