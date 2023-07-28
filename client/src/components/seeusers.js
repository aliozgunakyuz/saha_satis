import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/datashowstyles.css';
import {Link, useNavigate} from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast';


const Users = () => {
  const [users, setUsers] = useState([]);
  const [userinf, setUserinf] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/getuser')
      .then((response) => {
        setUsers(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleDelete = async (userId) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if(confirmed){
      try {
        await axios.delete(`/api/users/${userId}`);
        toast.success('User deleted successfully');
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } catch (error) {
        toast.error('Failed to delete user');
        console.error('Error deleting user:', error);
      }
    }
  };
  const handleUserTypeUpdate = async (userId, userType) => {
    try {
      console.log('User ID:', userId);
      console.log('User Type:', userType);
      const updatedUserType = userType === 'user' ? 'admin' : 'user';
      await axios.put(`/api/users/${userId}/${updatedUserType}`, { userType: updatedUserType });
      toast.success('User type updated successfully');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      toast.error('Failed to update user type');
      console.error('Error updating user type:', error);
    }
  };

  return (
    <div>
      <h1 className="products-title">Users List</h1>
      <div className="products-wrapper">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <table className="products-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Mail</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name} {user.surname}</td>
                <td>{user.phone}</td>
                <td>{user.mail}</td>
                <td>{user.userType}</td>
                <td><button type="button"className="btn2" onClick={() => handleUserTypeUpdate(user._id, user.userType)}>
                  {user.userType === 'user' ? 'Make Admin' : 'Make User'}
                </button></td>
                <td><button type="button" className="btn2" onClick={() => handleDelete(user._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn" onClick={()=>{navigate('/adminpanel')}}>Back</button>
      </div>
    </div>
  );
};


export default Users;
