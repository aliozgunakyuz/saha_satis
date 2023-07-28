import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import styles from '../styles/Username.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { productValidate } from '../helpFunc/productValidation';

const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productname: '',
    stock: '',
    price: '',
    color: '',
    category: '',
  });

  useEffect(() => {
    axios.get(`/api/getproductbyID/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, [productId]);

  const formik = useFormik({
    initialValues: {
      productname: product.productname,
      stock: product.stock,
      price: product.price,
      color: product.color,
      category: product.category,
    },
    validate: productValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      axios.put(`/api/products/${productId}`, values)
        .then((response) => {
          console.log('Product updated successfully:', response.data);
          navigate('/seeproducts');
        })
        .catch((error) => {
          console.error('Error updating product:', error);
        });
    },
  });
  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className=' flex justify-center items-center h-screen'>
        <div className={styles.glass} style={{ width: '60%' }} >
          <div className='title flex flex-col items-center text-blue-950 gap-10' >
            <h4 className='text-5xl font-bold py-2 '> Update Product </h4>
            <h4></h4>
          </div>
          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='textbox flex flex-col items-center gap-6'>
              <input {...formik.getFieldProps('productname')} type="text" className={styles.textbox} placeholder='Name' />
              <input {...formik.getFieldProps('stock')} type="text" className={styles.textbox} placeholder='Stock' />
              <input {...formik.getFieldProps('price')} type="text" className={styles.textbox} placeholder='Price' />
              <input {...formik.getFieldProps('color')} type="text" className={styles.textbox} placeholder='Color' />
              <input {...formik.getFieldProps('category')} type="text" className={styles.textbox} placeholder='Category' />
              <button className={styles.btn} type="submit">Update Product</button>
              <button className={styles.btn} onClick={() => { navigate('/seeproducts') }}>Back</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;