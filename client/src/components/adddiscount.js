import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styles from '../styles/Username.module.css';
import toast,{Toaster} from 'react-hot-toast';
import { useFormik } from 'formik';
import useFetch from '../hoooks/hookk.js';
import { useAuthStore } from '../store/store.js';
import { addDiscount} from '../helpFunc/discountFunctions.js';
import { discountValidate } from '../helpFunc/discountValidation.js';


export default function AddDiscount() {

  const navigate = useNavigate();
  const mail = useAuthStore((state) => state.auth.mail);
  const [{ isLoading, apiData, serverError }, setData] = useFetch(mail);

  const formik = useFormik({
    initialValues: {
      discountcode: '',
      discountpercent: '',
    },
    validate: discountValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      values = await Object.assign(values)
      let addDiscountPromise = addDiscount(values)
      toast.promise(addDiscountPromise, {
        loading: 'Adding Discount...',
        success: <b>Discount Informations Added</b>,
        error: <b>Discount Informations cant be added</b>
      })
      addDiscountPromise.then(function(){navigate('/adminpanel')});
    }
  })
  if (apiData?.userType === 'admin') {
  return (
    <div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className=' flex justify-center items-center h-screen'>
            <div className={styles.glass} style={{ width: '60%'}} >
                <div className='title flex flex-col items-center text-blue-950 gap-10' >
                    <h4 className='text-5xl font-bold py-2 '> Add Discount Code </h4>
                    <h4></h4>
                </div>
                <form className='py-1' onSubmit={formik.handleSubmit}>
                    <div className='textbox flex flex-col items-center gap-6'>
                        <input {...formik.getFieldProps('discountcode')} type="text" className={styles.textbox} placeholder='Discount Code' />
                        <input {...formik.getFieldProps('discountpercent')} type="text" className={styles.textbox} placeholder='Discount Percent' />
                        <button className={styles.btn} type="submit">Add Discount</button>
                        <button className={styles.btn} onClick={()=>{navigate('/adminpanel')}}>Back</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
}
