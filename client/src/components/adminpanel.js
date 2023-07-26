import React, {useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styles from '../styles/Username.module.css';
import {Toaster} from 'react-hot-toast';

export default function Register() {

  const navigate = useNavigate();

  return (
    <div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className=' flex justify-center items-center h-screen'>
            <div  style={{ width: '60%'}} >
                <div className='title flex flex-col items-center text-gray-50 gap-10' >
                    <h4 className='text-5xl font-bold py-2 '> Admin Panel </h4>
                </div>
                <form className='py-1'>
                    <div className='textbox flex flex-col items-center gap-6'>
                        <b className="text-gray-50">Products</b>
                        <button className={styles.btn} onClick={()=>{navigate('/adminaddproduct')}}>Add Product</button>
                        <button className={styles.btn} onClick={()=>{navigate('/seeproducts')}}>See Products</button>
                        <b className="text-gray-50">Clients</b>
                        <button className={styles.btn} onClick={()=>{navigate('/adminaddclient')}}>Add Client</button>
                        <button className={styles.btn} onClick={()=>{navigate('/seeclients')}}>See Clients</button>
                        <b className="text-gray-50">Sales</b>
                        <button className={styles.btn} onClick={()=>{navigate('/seesales')}}>See Sales</button>
                        <b className="text-gray-50">Users</b>
                        <button className={styles.btn} onClick={()=>{navigate('/seeusers')}}>See Users</button>
                        <button className={styles.btn} onClick={()=>{navigate('/')}}>Back</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    

  )
}
