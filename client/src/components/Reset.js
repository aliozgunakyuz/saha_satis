import React from 'react';
import {Link} from 'react-router-dom';
import avatar_default from '../assets/avatar.png';
import styles from '../styles/Username.module.css';
import {Toaster} from 'react-hot-toast';
import { useFormik } from 'formik';
import { repeatPasswordVerification } from '../helpFunc/PasswordValidate';


export default function Reset() {

  const formik = useFormik({
    initialValues: {
        password: '',
        confirm_password: ''
    },
    validate: repeatPasswordVerification,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
        console.log(values)
    }
  })

  return (
    <div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className=' flex justify-center items-center h-screen'>
            <div className={styles.glass} style ={{width : "50%"}}>
                <div className='title flex flex-col items-center text-gray-50' >
                    <h4 className='text-5xl font-bold'> Reset Password </h4>
                    <span className='py-4 text-xl w-2/3 text-center text-grey-500'>
                        Enter new password.
                    </span>
                </div>

                <form className='py-20' onSubmit={formik.handleSubmit}>
                    <div className='textbox flex flex-col items-center gap-6'>
                        <input {...formik.getFieldProps('password')} type="password" className={styles.textbox} placeholder='New Password' />
                        <input {...formik.getFieldProps('confirm_password')} type="password" className={styles.textbox} placeholder='Repeat Password' />
                        <button className={styles.btn} type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    

  )
}
