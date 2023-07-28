import React, {useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styles from '../styles/Username.module.css';
import toast,{Toaster} from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidate } from '../helpFunc/RegistrationValidation.js';

import { registerUser } from '../helpFunc/helper.js';

export default function Register() {

  const navigate = useNavigate();
  const [file, setFile] = useState()

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      mail: '',
      phone: '',
      password: '',
      confirm_password: ''
    },
    validate: registerValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      values = await Object.assign(values,{ profile: file || ''})
      let registerPromise = registerUser(values)
      toast.promise(registerPromise, {
        loading: 'Creating User...',
        success: <b>User Registered</b>,
        error: <b>Could not Registered</b>
      })
      registerPromise.then(function(){navigate('/')});
    }
  })

  return (
    <div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className=' flex justify-center items-center h-screen'>
            <div className={styles.glass} style={{ width: '60%'}} >
                <div className='title flex flex-col items-center text-blue-950 gap-10' >
                    <h4 className='text-5xl font-bold py-2 text-blue-950'> Register </h4>
                    <h4></h4>
                </div>
                <form className='py-1' onSubmit={formik.handleSubmit}>
                    <div className='textbox flex flex-col items-center gap-6'>
                      <div className="name flex w-3/4 gap-10">
                        <input {...formik.getFieldProps('name')} type="text" className={styles.textbox} placeholder='Name' />
                        <input {...formik.getFieldProps('surname')} type="text" className={styles.textbox} placeholder='Surname' />
                      </div>
                        <input {...formik.getFieldProps('mail')} type="text" className={styles.textbox} placeholder='Mail' />
                        <input {...formik.getFieldProps('phone')} type="text" className={styles.textbox} placeholder='Phone as 5xxxxxxxxx' />
                        <div className="name flex w-3/4 gap-10">
                          <input {...formik.getFieldProps('password')} type="password" className={styles.textbox} placeholder='Password' />
                          <input {...formik.getFieldProps('confirm_password')} type="password" className={styles.textbox} placeholder='Repeat Password' />
                        </div>
                        <button className={styles.btn} type="submit">Register</button>
                    </div>

                    <div className='text-center py-4'>
                        <span className='text-gray-300'>
                            Already registered?
                            <a>  </a>
                            <Link className="text-blue-950" to="/">Login</Link>
                        </span>
                    </div>

                </form>
            </div>
        </div>
    </div>
    

  )
}
