import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/datashowstyles.css';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import useFetch from '../hoooks/hookk.js';
import { useAuthStore } from '../store/store.js';

const Discounts = () => {
  const [discounts, setDiscounts] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const navigate = useNavigate();
  const [userType, setUserType] = useState('user');
  const mail = useAuthStore((state) => state.auth.mail);
  const [{ isLoading, apiData, serverError }, setData] = useFetch(mail);

  useEffect(() => {
    axios.get('/api/getdiscounts')
      .then((response) => {
        setDiscounts(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching discounts:', error);
      });
  }, []);

  const sortTable = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedDiscounts = [...discounts].sort((a, b) => {
      const aValue = a[key].toString().toLowerCase();
      const bValue = b[key].toString().toLowerCase();
      return direction === 'ascending' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });

    setDiscounts(sortedDiscounts);
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null; 
    }

    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  const handleDelete = async (discountId, discountcode) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${discountcode}?`);
    if (confirmed) {
      try {
        await axios.delete(`/api/discounts/${discountId}`);
        toast.success(`${discountcode} deleted successfully`);
        setTimeout(() => {
          navigate('/adminpanel')
        }, 500);
      } catch (error) {
        toast.error(`Failed to delete ${discountcode}: ${error.message}`);
        console.error('Error deleting discount code:', error);
      }
    }
  };
  
  if (apiData?.userType === 'admin') {
  return (
    <div>
      <h1 className="products-title">Discount Codes List</h1>
      <h1 className='table-info-text'>You can sort table by clicking table column names.</h1>
      <div className="products-wrapper">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <table className="products-table">
          <thead>
            <tr>
              <th>
                Discount Code
              </th>
              <th onClick={() => sortTable('discountpercent')}>
                Percent {getSortIcon('discountpercent')}
              </th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount) => (
              <tr key={discount._id}>
                <td>{discount.discountcode}</td>
                <td>%{discount.discountpercent}</td>
                <td>
                  <button  className="btn2" onClick={() => handleDelete(discount._id, discount.discountcode)} > Delete </button>
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

export default Discounts;
