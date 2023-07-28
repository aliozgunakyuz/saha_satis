import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import styles from '../styles/Username.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { clientValidate } from '../helpFunc/clientValidation.js';


const UpdateClient = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();

  const [client, setClient] = useState({
    clientname: '',
    clientaddress: '',
    clientphone: '',
    clientmail: '',
  });

  useEffect(() => {
    axios.get(`/api/getclientbyID/${clientId}`)
      .then((response) => {
        setClient(response.data);
      })
      .catch((error) => {
        console.error('Error fetching client data:', error);
      });
  }, [clientId]);

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
    onSubmit: (values) => {
      axios.put(`/api/clients/${clientId}`, values)
        .then((response) => {
          console.log('Client updated successfully:', response.data);
          navigate('/seeclients');
        })
        .catch((error) => {
          console.error('Error updating client:', error);
        });
    },
  });
  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className=' flex justify-center items-center h-screen'>
        <div className={styles.glass} style={{ width: '60%' }} >
          <div className='title flex flex-col items-center text-blue-950 gap-10' >
            <h4 className='text-5xl font-bold py-2 '> Update Client </h4>
            <h4></h4>
          </div>
          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='textbox flex flex-col items-center gap-6'>
              <input {...formik.getFieldProps('clientname')} type="text" className={styles.textbox} placeholder='Client Name' />
              <input {...formik.getFieldProps('clientaddress')} type="text" className={styles.textbox} placeholder='Client Address' />
              <input {...formik.getFieldProps('clientphone')} type="text" className={styles.textbox} placeholder='Client Phone' />
              <input {...formik.getFieldProps('clientmail')} type="text" className={styles.textbox} placeholder='Client Mail' />
              <button className={styles.btn} type="submit">Update Client</button>
              <button className={styles.btn} onClick={() => { navigate('/seeclients') }}>Back</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateClient;