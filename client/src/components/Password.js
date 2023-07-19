import React from 'react';
import {Link} from 'react-router-dom';
import avatar_default from '../assets/avatar.png';
import styles from '../styles/Username.module.css';
import {Toaster} from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helpFunc/PasswordValidate.js';
import useFetch from '../hoooks/hookk.js';
import { useAuthStore } from '../store/store.js';


export default function Password() {

  const {mail} = useAuthStore(state => state.auth)
  const [{isLoading, apiData, serverError}] = useFetch('/user/'+mail)

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

  if(isLoading) return <h1 className='text-2xl font-bold'>Loading...</h1>
  if(serverError) return <h1 className='text-xl text-gray-50'>{serverError.message}</h1>

  return (
    <div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className=' flex justify-center items-center h-screen'>
            <div className={styles.glass}>
                <div className='title flex flex-col items-center text-gray-50' >
                    <h4 className='text-5xl font-bold'> Hello {apiData?.name} {apiData?.surname} </h4>
                    <span className='py-4 text-xl w-2/3 text-center text-grey-500'>
                        Write smth
                    </span>
                </div>

                <form className='py-1' onSubmit={formik.handleSubmit}>
                    <div className='profile flex justify-center py-4'>
                        <img src={apiData?.profilephoto || avatar_default} className={styles.profile_img} alt="avatar" />
                    </div>
                    <div className='textbox flex flex-col items-center gap-6'>
                        <input {...formik.getFieldProps('password')} type="password" className={styles.textbox} placeholder='Password' />
                        <button className={styles.btn} type="submit">Login</button>
                    </div>

                    <div className='text-center py-4'>
                        <span className='text-gray-500'>
                            Forgot Password?
                            <a>  </a>
                            <Link className="text-purple-500" to="/recovery">Recover from here</Link>
                        </span>
                    </div>

                </form>
            </div>
        </div>
    </div>
    

  )
}
