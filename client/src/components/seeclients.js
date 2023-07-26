import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/datashowstyles.css';
import {Link, useNavigate} from 'react-router-dom';

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

  return (
    <div>
        <h1 className="products-title">Clients List</h1>
        <div className="products-wrapper">
        
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
                <td><button className="btn2" onClick={()=>{navigate('/adminpanel')}}>Update</button></td>
                <td><button className="btn2" onClick={()=>{navigate('/adminpanel')}}>Delete</button></td>
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
