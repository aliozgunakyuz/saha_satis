import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/datashowstyles.css';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import useFetch from '../hoooks/hookk.js';
import { useAuthStore } from '../store/store.js';
import Layout from './Layout';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const navigate = useNavigate();
  const [userType, setUserType] = useState('user');
  const mail = useAuthStore((state) => state.auth.mail);
  const [{ isLoading, apiData, serverError }, setData] = useFetch(mail);

  useEffect(() => {
    axios.get('/api/getclients')
      .then((response) => {
        setClients(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching clients:', error);
      });
  }, []);

  const sortTable = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedClients = [...clients].sort((a, b) => {
      const aValue = a[key].toString().toLowerCase();
      const bValue = b[key].toString().toLowerCase();
      return direction === 'ascending' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });

    setClients(sortedClients);
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null; 
    }

    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  const handleDelete = async (clientId, clientName) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${clientName}?`);
    if (confirmed) {
      try {
        await axios.delete(`/api/clients/${clientId}`);
        toast.success(`${clientName} deleted successfully`);
        setTimeout(() => {
          navigate('/adminpanel')
        }, 500);
      } catch (error) {
        toast.error(`Failed to delete ${clientName}: ${error.message}`);
        console.error('Error deleting client:', error);
      }
    }
  };

  const handleUpdate = (clientId) => {
    navigate(`/updateclient/${clientId}`);
  };
  
  if (apiData?.userType === 'admin') {
  return (
    <Layout>
      <div>
      <h1 className="products-title">Clients List</h1>
      <h1 className='table-info-text'>You can sort table by clicking table column names.</h1>
      <div className="products-wrapper">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <table className="products-table">
          <thead>
            <tr>
              <th onClick={() => sortTable('clientname')}>
                Name {getSortIcon('clientname')}
              </th>
              <th onClick={() => sortTable('clientphone')}>
                Phone {getSortIcon('clientphone')}
              </th>
              <th onClick={() => sortTable('clientmail')}>
                Mail {getSortIcon('clientmail')}
              </th>
              <th onClick={() => sortTable('clientaddress')}>
                Address {getSortIcon('clientaddress')}
              </th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client._id}>
                <td>{client.clientname}</td>
                <td>{client.clientphone}</td>
                <td>{client.clientmail}</td>
                <td>{client.clientaddress}</td>
                <td>
                  <button className="text-[#143228]" onClick={() => handleUpdate(client._id)} > Update </button>
                </td>
                <td>
                  <button  className="text-[#143228]" onClick={() => handleDelete(client._id, client.clientname)} > Delete </button>
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
    </Layout>
  );
};
}

export default Clients;
