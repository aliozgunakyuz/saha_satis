import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/datashowstyles.css';
import {Link, useNavigate} from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast';


const Clients = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/getclients')
      .then((response) => {
        setClients(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching clients:', error);
      });
  }, []);

  const handleDelete = async (clientId) => {
    const confirmed = window.confirm('Are you sure you want to delete this client?');
    if(confirmed){
      try {
        await axios.delete(`/api/clients/${clientId}`);
        toast.success('Client deleted successfully');
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } catch (error) {
        toast.error('Failed to delete client');
        console.error('Error deleting client:', error);
      }
    }
  };
  const handleUpdate = (clientId) => {
    navigate(`/updateclient/${clientId}`);
  };

  return (
    <div>
        <h1 className="products-title">Clients List</h1>
        <div className="products-wrapper">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <table className="products-table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Mail</th>
                <th>Address</th>
            </tr>
            </thead>
            <tbody>
            {clients.map((client) => (
                <tr key={client._id}>
                <td>{client.clientname}</td>
                <td>{client.clientphone}</td>
                <td>{client.clientmail}</td>
                <td>{client.clientaddress}</td>
                <td><button className="btn2" onClick={() => handleUpdate(client._id)}>Update</button></td>
                <td><button className="btn2" onClick={() => handleDelete(client._id)}>Delete</button></td>
                </tr>
            ))}
            </tbody>
        </table>
        <button className="btn" onClick={()=>{navigate('/adminpanel')}}>Back</button>
        </div>
    </div>
  );
};

export default Clients;
