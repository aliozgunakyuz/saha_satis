import React, { useEffect } from 'react';
import styles from '../styles/Username.module.css';
import toast, {Toaster} from 'react-hot-toast';
import { useFormik } from 'formik';
import { repeatPasswordVerification } from '../helpFunc/PasswordValidate';
import { resetpassword } from '../helpFunc/helper.js';
import { useAuthStore } from '../store/store.js';
import { useNavigate, Navigate } from 'react-router-dom';
import useFetch from '../hoooks/hookk.js';


export default function Reset() {

 const {mail} = useAuthStore(state => state.auth);
 const navigate = useNavigate();
 const [{isLoading,apiData,status,serverError}] = useFetch('resetSession')
 const decodedMail = decodeURIComponent(mail);


  const formik = useFormik({
    initialValues: {
        password: '',
        confirm_password: ''
    },
    validate: repeatPasswordVerification,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
        let resetPromise = resetpassword({mail:decodedMail,password:values.password})
        toast.promise(resetPromise,{
            loading: 'updating password...',
            success: <b>Password reset successfull</b>,
            error: <b>Error occurred</b>
        });
        resetPromise.then(function(){navigate('/password')})

    }
  })

  if(isLoading) return <h1 className='text-2xl font-bold'>Loading...</h1>
  if(serverError) return <h1 className='text-xl text-gray-50'>{serverError.message}</h1>
  if(status && status != 201) return <Navigate to={'/password'} replace={true}></Navigate>

  return (
    <div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className=' flex justify-center items-center h-screen'>
            <div className={styles.glass} style ={{width : "50%"}}>
                <div className='title flex flex-col items-center text-[#145728]' >
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
