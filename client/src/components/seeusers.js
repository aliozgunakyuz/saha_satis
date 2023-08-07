import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/datashowstyles.css';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import useFetch from '../hoooks/hookk.js';
import { useAuthStore } from '../store/store.js';



const Users = () => {
  const [users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const navigate = useNavigate();
  const [userType, setUserType] = useState('user');
  const mail = useAuthStore((state) => state.auth.mail);
  const [{ isLoading, apiData, serverError }, setData] = useFetch(mail);

  useEffect(() => {
    axios.get('/api/getuser')
      .then((response) => {
        setUsers(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const sortTable = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedUsers = [...users].sort((a, b) => {
      const aValue = a[key].toString().toLowerCase();
      const bValue = b[key].toString().toLowerCase();
      return direction === 'ascending' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });

    setUsers(sortedUsers);
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null; 
    }

    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  const handleDelete = async (userId, userName) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${userName}?`);
    if (confirmed) {
      try {
        await axios.delete(`/api/users/${userId}`);
        toast.success(`${userName} deleted successfully`);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } catch (error) {
        toast.error(`Failed to delete ${userName}: ${error.message}`);
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleUserTypeUpdate = async (userId, userType) => {
    try {
      const updatedUserType = userType === 'user' ? 'admin' : 'user';
      await axios.put(`/api/users/${userId}/${updatedUserType}`, { userType: updatedUserType });
      toast.success('User type updated successfully');
      setTimeout(() => {
        navigate('/adminpanel')
      }, 500);
    } catch (error) {
      toast.error('Failed to update user type');
    }
  };
  if (apiData?.userType === 'admin') {
  return (
    <div>
      <h1 className="products-title">Users List</h1>
      <h1 className='table-info-text'>You can sort table by clicking table column names.</h1>
      <div className="products-wrapper">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <table className="products-table">
          <thead>
            <tr>
              <th onClick={() => sortTable('name')}>
                Name {getSortIcon('name')}
              </th>
              <th onClick={() => sortTable('phone')}>
                Phone {getSortIcon('phone')}
              </th>
              <th onClick={() => sortTable('mail')}>
                Mail {getSortIcon('mail')}
              </th>
              <th onClick={() => sortTable('userType')}>
                Type {getSortIcon('userType')}
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name} {user.surname}</td>
                <td>{user.phone}</td>
                <td>{user.mail}</td>
                <td>{user.userType}</td>
                <td>
                  <button type="button" className="btn2" onClick={() => handleUserTypeUpdate(user._id, user.userType)}>
                    {user.userType === 'user' ? 'Make Admin' : 'Make User'}
                  </button>
                </td>
                <td>
                  <button type="button"  className="btn2" onClick={() => handleDelete(user._id, `${user.name} ${user.surname}`)}> Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn" onClick={() => { navigate('/adminpanel') }}>
          Back
        </button>
      </div>
    </div>
  );
};
}

export default Users;
