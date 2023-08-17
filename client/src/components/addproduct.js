import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styles from '../styles/Username.module.css';
import toast,{Toaster} from 'react-hot-toast';
import { useFormik } from 'formik';
import { productValidate } from '../helpFunc/productValidation.js';
import { addProduct } from '../helpFunc/productFunctions.js';
import useFetch from '../hoooks/hookk.js';
import { useAuthStore } from '../store/store.js';
import img2base64 from '../helpFunc/convert'; 
import def_prod_img from '../assets/deafult_product_img.jpg';
import Layout from './Layout';

export default function AddProduct() {

  const navigate = useNavigate();
  const [file, setFile] = useState()
  const mail = useAuthStore((state) => state.auth.mail);
  const [{ isLoading, apiData, serverError }, setData] = useFetch(mail);

  const formik = useFormik({
    initialValues: {
      productname: '',
      stock: '',
      price: '',
      color: '',
      category: '',
    },
    validate: productValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      values = await Object.assign(values,{productimage:file||''})
      let addProductPromise = addProduct(values)
      toast.promise(addProductPromise, {
        loading: 'Adding Product...',
        success: <b>Product Added</b>,
        error: <b>Product cant be added</b>
      })
      addProductPromise.then(function(){navigate('/adminpanel')});
    }
  })

  const onUpload = async e => {
    const base64 = await img2base64(e.target.files[0]);
    setFile(base64);
  }

  if (apiData?.userType === 'admin') {
  return (
    <Layout>
      <div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className=' flex justify-center items-center h-screen'>
            <div className={styles.glass} style={{ width: '60%'}} >
                <div className='title flex flex-col items-center text-blue-950 gap-5' >
                    <h4 className='text-5xl font-bold p '> Add Product </h4>
                    <h4></h4>
                </div>
                <form className='py-1' onSubmit={formik.handleSubmit}>
                    <div className='profile flex justify-center py-4'>
                      <label htmlFor="productimage">
                        <img src={file || def_prod_img} className={styles.product_img} alt="click here to add image" />
                        <b className='text-blue-900'>Click above to add image</b>
                      </label>
                      <input onChange={onUpload} type="file" id='productimage' name='productimage' />
                    </div>
                    <div className='textbox flex flex-col items-center gap-6'>
                        <input {...formik.getFieldProps('productname')} type="text" className={styles.textbox} placeholder='Product Name' />
                        <input {...formik.getFieldProps('stock')} type="text" className={styles.textbox} placeholder='Stock (Should be Integer' />
                        <input {...formik.getFieldProps('price')} type="text" className={styles.textbox} placeholder='Price (e.g. 3,99)' />
                        <input {...formik.getFieldProps('color')} type="text" className={styles.textbox} placeholder='Color' />
                        <input {...formik.getFieldProps('category')} type="text" className={styles.textbox} placeholder='Category' />
                        <button className={styles.btn} type="submit">Add Product</button>
                        <button className={styles.btn} onClick={()=>{navigate('/adminpanel')}}>Back</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </Layout>
    

  )
}}