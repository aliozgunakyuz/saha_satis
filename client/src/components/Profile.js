import React, {useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import avatar_default from '../assets/avatar.png';
import styles from '../styles/Username.module.css';
import {Toaster} from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidate } from '../helpFunc/MailValidate.js';


export default function Profile() {

  const [file, setFile] = useState()

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      mail: '',
      phone: '',
    },
    validate: profileValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
    }
  })



  return (
    <div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className=' flex justify-center items-center h-screen'>
            <div className={styles.glass} style={{ width: '50%'}} >
                <div className='title flex flex-col items-center text-gray-50' >
                    <h4 className='text-5xl font-bold'> Register </h4>
                </div>

                <form className='py-1' onSubmit={formik.handleSubmit}>
                    <div className='textbox flex flex-col items-center gap-6'>
                      <span className='text-gray-50 text-sm text-left'>Update your profile.</span>
                      <div className="name flex w-3/4 gap-10">
                        <input {...formik.getFieldProps('name')} type="text" className={styles.textbox} placeholder='Name' />
                        <input {...formik.getFieldProps('surname')} type="text" className={styles.textbox} placeholder='Surname' />
                      </div>
                        <input {...formik.getFieldProps('mail')} type="text" className={styles.textbox} placeholder='Mail' />
                        <div className="input text-center"><span className='text-sm text-gray-100'>Please enter your phone as 5xxxxxxxxx</span></div>
                        <input {...formik.getFieldProps('phone')} type="text" className={styles.textbox} placeholder='Phone' />
                        <div className="name flex w-3/4 gap-10">
                        <button className={styles.btn} type="back">Back</button>
                        <button className={styles.btn} type="submit">Update</button>
                      </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
