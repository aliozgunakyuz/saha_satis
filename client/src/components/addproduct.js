import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styles from '../styles/Username.module.css';
import toast,{Toaster} from 'react-hot-toast';
import { useFormik } from 'formik';
import { productValidate } from '../helpFunc/productValidation.js';
import { addProduct } from '../helpFunc/productFunctions.js';

export default function AddProduct() {

  const navigate = useNavigate();

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
      values = await Object.assign(values)
      let addProductPromise = addProduct(values)
      toast.promise(addProductPromise, {
        loading: 'Adding Product...',
        success: <b>Product Added</b>,
        error: <b>Product cant be added</b>
      })
      addProductPromise.then(function(){navigate('/adminpanel')});
    }
  })

  return (
    <div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className=' flex justify-center items-center h-screen'>
            <div className={styles.glass} style={{ width: '60%'}} >
                <div className='title flex flex-col items-center text-gray-50 gap-10' >
                    <h4 className='text-5xl font-bold py-2 '> Add Product </h4>
                    <h4></h4>
                </div>
                <form className='py-1' onSubmit={formik.handleSubmit}>
                    <div className='textbox flex flex-col items-center gap-6'>
                        <input {...formik.getFieldProps('productname')} type="text" className={styles.textbox} placeholder='Product Name' />
                        <input {...formik.getFieldProps('stock')} type="text" className={styles.textbox} placeholder='Stock (Should be Integer' />
                        <input {...formik.getFieldProps('price')} type="text" className={styles.textbox} placeholder='Price (e.g. 3,99)' />
                        <input {...formik.getFieldProps('color')} type="text" className={styles.textbox} placeholder='Color' />
                        <input {...formik.getFieldProps('category')} type="text" className={styles.textbox} placeholder='Category' />
                        <button className={styles.btn} type="submit">Add Product</button>
                        <button className={styles.btn} type="button">Back</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    

  )
}
