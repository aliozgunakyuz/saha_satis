import React from 'react';
import {Link} from 'react-router-dom';
import avatar_default from '../assets/avatar.png';
import styles from '../styles/Username.module.css';
import {Toaster} from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helpFunc/PasswordValidate';


export default function Recovery() {

  const formik = useFormik({
    initialValues: {
        password: ''
    },
    validate: passwordValidate,
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
            <div className={styles.glass}>
                <div className='title flex flex-col items-center text-gray-50' >
                    <h4 className='text-5xl font-bold'> Recover Password </h4>
                    <span className='py-4 text-xl w-2/3 text-center text-grey-500'>
                        Enter OTP to recover password.
                    </span>
                </div>

                <form className='pt-20' onSubmit={formik.handleSubmit}>
                    <div className='textbox flex flex-col items-center gap-6'>

                        <div className="input text-center">
                          <span className='py-4 text-sm text-left text-gray-100'>
                            Enter 6 digit OTP sent to your email address.
                          </span>
                          <input type="text" className={styles.textbox} placeholder='OTP' />
                        </div>

                        <button className={styles.btn} type="submit">Recover</button>
                    </div>
                    <div className='text-center py-4'>
                        <span className='text-gray-500'>
                            Can't get OTP?
                            <a>  </a>
                            <button className="text-purple-500">Resend</button>
                        </span>
                    </div>

                </form>
            </div>
        </div>
    </div>
    

  )
}
