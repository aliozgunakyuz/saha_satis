import React, { useEffect, useState } from 'react';
import styles from '../styles/Username.module.css';
import toast,{Toaster} from 'react-hot-toast';
import {useAuthStore} from '../store/store.js';
import {OTPmaker, OTPverify} from '../helpFunc/helper.js';
import {useNavigate} from 'react-router-dom';



export default function Recovery() {

  const {mail} = useAuthStore(state => state.auth);
  const [OTP,setOTP] = useState();
  const navigate =useNavigate();

  useEffect(() => {
    OTPmaker(mail).then((OTP) => {
        if(OTP) return toast.success('OTP has been sent to your mail')
        return toast.error('Problem occured')
    })
  },[mail])

  async function onSubmit(event){
    event.preventDefault();

    try {
        let {status} = await OTPverify({mail, code: OTP});
    if(status === 201){
        toast.success('OTP Verified');
        return navigate('/reset');
    }
    } catch (error) {
        return toast.error('Wrong OTP');
    }
  }

  //resend otp
  function reOTP(){
    let sendPromise = OTPmaker(mail);
    toast.promise(sendPromise, {
        loading: 'sending OTP again',
        success: <b>OTP sent</b>,
        error: <b> Error occured</b>
    });
    sendPromise.then(OTP=>{
    });
  }

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

                <form className='pt-20' onSubmit={onSubmit}>
                    <div className='textbox flex flex-col items-center gap-6'>

                        <div className="input text-center">
                          <span className='py-4 text-sm text-left text-gray-100'>
                            Enter 6 digit OTP sent to your email address.
                          </span>
                          <input onChange={(e)=>setOTP(e.target.value)} type="text" className={styles.textbox} placeholder='OTP' />
                        </div>

                        <button className={styles.btn} type="submit">Recover</button>
                    </div>
                </form>
                <div className='text-center py-4'>
                    <span className='text-gray-500'>
                        Can't get OTP?
                        <button className="text-purple-500" onClick={reOTP}>Resend</button>
                    </span>
                </div>
            </div>
        </div>
    </div>
    

  )
}
