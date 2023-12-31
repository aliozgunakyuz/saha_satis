import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hoooks/hookk.js';
import styles from '../styles/Username.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidate } from '../helpFunc/MailValidate.js';
import { updateuser } from '../helpFunc/helper.js';
import { useAuthStore } from '../store/store.js';
import axios from 'axios';
import Layout from './Layout.js';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export default function Profile() {
  const navigate = useNavigate();
  const mail = useAuthStore((state) => state.auth.mail);

  // Fetch user data using the useFetch hook
  const [{ isLoading, apiData, serverError }, setData] = useFetch(mail);

  const formik = useFormik({
    initialValues: {
      name: apiData?.name || '',
      surname: apiData?.surname || '',
      mail: apiData?.mail || '',
      phone: apiData?.phone || '',
    },
    enableReinitialize: true,
    validate: profileValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let updatePromise = updateuser(values);
      toast.promise(updatePromise, {
        loading: 'Loading...',
        success: <b>Updated</b>,
        error: <b>error occurred</b>,
      });
    },
  });

  if (isLoading) return <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  }}>
    <h1 style={{
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#333',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
    }}>
      Loading...
    </h1>
  </div>;
  if (serverError) return <h1 className='text-xl text-gray-50'>{serverError.message}</h1>;

  return (
    <Layout>
      <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center '>
        <div className={styles.glass} style={{ width: '50%' }}>
          <div className='title flex flex-col items-center text-[#145728]'>
            <h4 className='text-5xl font-bold'> Update Profile </h4>
          </div>
          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='textbox flex flex-col items-center gap-6'>
              <span className='text-[#145728] text-sm text-left'>Update your profile.</span>
              <div className='name flex w-3/ gap-10'>
                <input {...formik.getFieldProps('name')} type='text' className={styles.textbox} placeholder='Name' />
                <input
                  {...formik.getFieldProps('surname')}
                  type='text'
                  className={styles.textbox}
                  placeholder='Surname'
                />
              </div>
              <input {...formik.getFieldProps('mail')} type='text' className={styles.textbox} placeholder='Mail' />
              <input {...formik.getFieldProps('phone')} type='text' className={styles.textbox} placeholder='Phone' />
              <div className='name flex w-3/4 gap-10'>
                <button className={styles.btn} onClick={() => navigate('/homepage')}>
                  Back
                </button>
                <button className={styles.btn} type='submit'>
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </Layout>
  );
}
