import React, {useState } from 'react';
import {useNavigate} from 'react-router-dom';
import useFetch from '../hoooks/hookk.js';
import styles from '../styles/Username.module.css';
import toast, {Toaster} from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidate } from '../helpFunc/MailValidate.js';
import { updateuser } from '../helpFunc/helper.js';


export default function Profile() {

  const [{isLoading, apiData, serverError}] = useFetch();
  const navigate = useNavigate();


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
    onSubmit: async values => {
      let updatePromise = updateuser(values);
      toast.promise(updatePromise , {
        loading:"Loading...",
        success : <b>Updated</b>,
        error: <b>error occured</b>
      })
    }
  })

  //logout handler
  function userLogout(){
    localStorage.removeItem('token');
    navigate('/');
  }

  if(isLoading) return <h1 className='text-2xl font-bold'>Loading...</h1>
  if(serverError) return <h1 className='text-xl text-gray-50'>{serverError.message}</h1>

  return (
    <div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className=' flex justify-center items-center h-screen'>
            <div className={styles.glass} style={{ width: '50%'}} >
                <div className='title flex flex-col items-center text-gray-50' >
                    <h4 className='text-5xl font-bold'> Update Profile </h4>
                </div>
                <form className='py-1' onSubmit={formik.handleSubmit}>
                    <div className='textbox flex flex-col items-center gap-6'>
                      <span className='text-gray-50 text-sm text-left'>Update your profile.</span>
                      <div className="name flex w-3/4 gap-10">
                        <input {...formik.getFieldProps('name')} type="text" className={styles.textbox} placeholder='Name' />
                        <input {...formik.getFieldProps('surname')} type="text" className={styles.textbox} placeholder='Surname' />
                      </div>
                        <input {...formik.getFieldProps('mail')} type="text" className={styles.textbox} placeholder='Mail' />
                        <input {...formik.getFieldProps('phone')} type="text" className={styles.textbox} placeholder='Phone' />
                        <div className="name flex w-3/4 gap-10">
                        <button className="btn" onClick={() => { navigate('/homepage') }}>Back</button>
                        <button className={styles.btn} type="submit">Update</button>
                      </div>
                    </div>
                </form>
                <div className="text-center py-4">
                <button className={styles.btn} onClick={userLogout} type="submit">Logout</button>
              </div>
            </div>
        </div>
    </div>
  )
}
