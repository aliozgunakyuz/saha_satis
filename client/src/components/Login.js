import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import avatar_default from '../assets/avatar.png';
import styles from '../styles/Username.module.css';
import {Toaster} from 'react-hot-toast';
import { useFormik } from 'formik';
import { mailValidate } from '../helpFunc/MailValidate';
import {useAuthStore} from '../store/store.js';



export default function Username() {

  const navigate = useNavigate();

  const setMail = useAuthStore(state => state.setMail);
  const mail = useAuthStore(state => state.auth.mail);


  const formik = useFormik({
    initialValues: {
        mail: ''
    },
    validate: mailValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
        setMail(values.mail);
        console.log(values.mail);
        navigate('/password')
    }
  })

  return (
    <div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className=' flex justify-center items-center h-screen'>
            <div className={styles.glass}>
                <div className='title flex flex-col items-center indigo' >
                    <h4 className='text-5xl text-blue-950 font-bold'> Hello </h4>
                    <span className='py-4 text-xl w-2/3 text-center text-blue-950' >
                        Please Log In
                    </span>
                </div>

                <form className='py-1' onSubmit={formik.handleSubmit}>
                    <div className='profile flex justify-center py-4'>
                        <img src={avatar_default} className={styles.profile_img} alt="avatar" />
                    </div>
                    <div className='textbox flex flex-col items-center gap-6'>
                        <input {...formik.getFieldProps('mail')} type="text" className={styles.textbox} placeholder='Mail' />
                        <button className={styles.btn} type="submit">Login</button>
                    </div>

                    <div className='text-center py-4'>
                        <span className='text-gray-900'>
                            Not a Member?
                            <a>  </a>
                            <Link className="text-blue-950" to="/register">Register</Link>
                        </span>
                    </div>

                </form>
            </div>
        </div>
    </div>
    

  )
}
