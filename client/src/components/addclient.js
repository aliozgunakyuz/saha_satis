import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styles from '../styles/Username.module.css';
import { addClient } from '../helpFunc/clientFunctions.js';
import toast,{Toaster} from 'react-hot-toast';
import { useFormik } from 'formik';
import { clientValidate } from '../helpFunc/clientValidation.js';
import useFetch from '../hoooks/hookk.js';
import { useAuthStore } from '../store/store.js';
import Layout from './Layout';


export default function AddClient() {

  const navigate = useNavigate();
  const mail = useAuthStore((state) => state.auth.mail);
  const [{ isLoading, apiData, serverError }, setData] = useFetch(mail);

  const formik = useFormik({
    initialValues: {
      clientname: '',
      clientaddress: '',
      clientphone: '',
      clientmail: '',
    },
    validate: clientValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      values = await Object.assign(values)
      let addClientPromise = addClient(values)
      toast.promise(addClientPromise, {
        loading: 'Adding Client...',
        success: <b>Client Added</b>,
        error: <b>Client cant be added</b>
      })
      addClientPromise.then(function(){navigate('/adminpanel')});
    }
  })
  if (apiData?.userType === 'admin') {
  return (
    <Layout>
      <div className='container mx-auto'>
          <Toaster position='top-center' reverseOrder={false}></Toaster>
          <div className=' flex justify-center items-center'>
              <div className={styles.glass} style={{ width: '60%'}} >
                  <div className='title flex flex-col items-center text-[#145728] gap-10' >
                      <h4 className='text-5xl font-bold py-2 '> Add Client </h4>
                      <h4></h4>
                  </div>
                  <form className='py-1' onSubmit={formik.handleSubmit}>
                      <div className='textbox flex flex-col items-center gap-6'>
                          <input {...formik.getFieldProps('clientname')} type="text" className={styles.textbox} placeholder='Client Name' />
                          <input {...formik.getFieldProps('clientaddress')} type="text" className={styles.textbox} placeholder='Client Address' />
                          <input {...formik.getFieldProps('clientphone')} type="text" className={styles.textbox} placeholder='Client Phone (as 5xxxxxxxxx' />
                          <input {...formik.getFieldProps('clientmail')} type="text" className={styles.textbox} placeholder='Client Mail' />
                          <button className={styles.btn} type="submit">Add Client</button>
                          <button className={styles.btn} onClick={()=>{navigate('/adminpanel')}}>Back</button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
    </Layout>
  )
}
}
