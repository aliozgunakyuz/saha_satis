import React, {useState} from 'react';

import {useNavigate} from 'react-router-dom';



export default function Username() {

  const navigate = useNavigate();
  const [userType, setUserType] = useState('user');


  function userLogout(){
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <div className='container mx-auto'>
        <h4> Welcome to Landing Page </h4>
        <button className="btn" onClick={() => { navigate('/profile') }}>Update Profile</button>
        <button className="btn" onClick={() => { navigate('/adminpanel') }}>Admin Panel</button>
        <button className="btn" onClick={userLogout}>Logout</button>
    </div>
    

  )
}
