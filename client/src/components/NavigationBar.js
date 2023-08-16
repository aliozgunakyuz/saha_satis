import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function NavigationBar() {
    const navigate = useNavigate();
    return (
        <div
            className='flex justify-between px-4 items-center w-full h-[80px]  bg-slate-400 text-black'
        >
            <h1 className='font-extrabold text-[20px]'> Logo text </h1>

            <div className='flex'>
                <button className='border-none bg-black text-white rounded-xl px-4 py-2'
                    onClick={() => { navigate('/profile') }}>
                    Profile
                </button>
            </div>
        </div >
    )
}
