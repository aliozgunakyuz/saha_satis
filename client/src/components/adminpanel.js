import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from '../styles/Username.module.css';
import useFetch from '../hoooks/hookk.js';
import { useAuthStore } from '../store/store.js';

export default function Register() {
  const navigate = useNavigate();
  const mail = useAuthStore((state) => state.auth.mail);
  const [{ isLoading, apiData, serverError }, setData] = useFetch(mail);

  useEffect(() => {
    if (apiData?.userType === 'user') {navigate('/homepage')}
  }, []);


  if (apiData?.userType === 'admin') {
    return (
        <div className='container mx-auto'>
            <div className=' flex justify-center items-center h-screen'>
                <div  style={{ width: '60%'}} >
                    <div className='title flex flex-col items-center text-blue-950 gap-10' >
                        <h4 className='text-5xl font-bold py-2 '> Admin Panel </h4>
                    </div>
                    <form className='py-1'>
                        <div className='textbox flex flex-col items-center gap-6'>
                            <b className="text-blue-950">Products</b>
                            <button className={styles.btn} onClick={()=>{navigate('/adminaddproduct')}}>Add Product</button>
                            <button className={styles.btn} onClick={()=>{navigate('/seeproducts')}}>See Products</button>
                            <b className="text-blue-950">Clients</b>
                            <button className={styles.btn} onClick={()=>{navigate('/adminaddclient')}}>Add Client</button>
                            <button className={styles.btn} onClick={()=>{navigate('/seeclients')}}>See Clients</button>
                            <b className="text-blue-950">Sales & Discounts</b>
                            <button className={styles.btn} onClick={()=>{navigate('/seesales')}}>See Sales</button>
                            <button className={styles.btn} onClick={()=>{navigate('/adddiscount')}}>Add Discount</button>
                            <button className={styles.btn} onClick={()=>{navigate('/seediscounts')}}>See Discounts</button>
                            <b className="text-blue-950">Users</b>
                            <button className={styles.btn} onClick={()=>{navigate('/seeusers')}}>See Users</button>
                            <button className={styles.btn} onClick={()=>{navigate('/homepage')}}>Back</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}