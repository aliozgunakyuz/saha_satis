import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import styles from '../styles/Username.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { productValidate } from '../helpFunc/productValidation';
import useFetch from '../hoooks/hookk.js';
import { useAuthStore } from '../store/store.js';
import img2base64 from '../helpFunc/convert';
import Layout from './Layout';

const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const mail = useAuthStore((state) => state.auth.mail);
  const [{ isLoading, apiData, serverError }, setData] = useFetch(mail);
  const [file, setFile] = useState()
  const [product, setProduct] = useState({
    productname: '',
    stock: '',
    price: '',
    weight: '',
    category: '',
  });

  useEffect(() => {
    axios.get(`/api/getproductbyID/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        toast.error('Error fetching products please try again later. Error: '+error)
      });
  }, [productId]);

  const formik = useFormik({
    initialValues: {
      productname: product.productname,
      stock: product.stock,
      price: product.price,
      weight: product.weight,
      category: product.category,
    },
    enableReinitialize: true,
    validate: productValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      const updatedProduct = { ...values, productimage: file || product.productimage || '' };
      axios.put(`/api/products/${productId}`, updatedProduct)
        .then((response) => {
          toast.success(`${values.productname} updated successfully`);
          setTimeout(() => {
            navigate('/seeproducts');
          }, 500);
        })
        .catch((error) => {
          toast.error(`Failed to update ${values.productname}: ${error.message}`);
        });
    },
  });

  const onUpload = async e => {
    const base64 = await img2base64(e.target.files[0]);
    setFile(base64);
    formik.setFieldValue('productimage', base64);
  };

  if (apiData?.userType === 'admin') {
  return (
    <Layout>
      <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className=' flex justify-center items-center h-screen'>
        <div className={styles.glass} style={{ width: '60%' }} >
          <div className='title flex flex-col items-center text-[#145728] gap-10' >
            <h4 className='text-5xl font-bold py-2 '> Update Product </h4>
            <h4></h4>
          </div>
          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <label htmlFor="productimage">
               <img src={file||product.productimage||''} className={styles.product_img} alt="click here to add image" />
              </label>
              <input onChange={onUpload} type="file" id='productimage' name='productimage' />
            </div>
            <div className='textbox flex flex-col items-center gap-6'>
              <input {...formik.getFieldProps('productname')} type="text" className={styles.textbox} placeholder='Name' />
              <input {...formik.getFieldProps('stock')} type="text" className={styles.textbox} placeholder='Stock' />
              <input {...formik.getFieldProps('price')} type="text" className={styles.textbox} placeholder='Price' />
              <input {...formik.getFieldProps('weight')} type="text" className={styles.textbox} placeholder='Weight' />
              <input {...formik.getFieldProps('category')} type="text" className={styles.textbox} placeholder='Category' />
              <button className={styles.btn} type="submit">Update Product</button>
              <button className={styles.btn} onClick={() => { navigate('/seeproducts') }}>Back</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </Layout>
  );
};
}
export default UpdateProduct;