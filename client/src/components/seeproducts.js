// src/components/Products.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const navigate = useNavigate();
  const [userType, setUserType] = useState('user');

  useEffect(() => {
    axios.get('/api/getproducts')
      .then((response) => {
        const sortedProducts = response.data.sort((a, b) => a.productname.localeCompare(b.productname));
        setProducts(sortedProducts);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const sortTable = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedProducts = [...products].sort((a, b) => {
      if (key === 'productname' || key === 'color' || key === 'category') {
        const aValue = a[key].toString().toLowerCase();
        const bValue = b[key].toString().toLowerCase();
        return direction === 'ascending' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else if (key === 'stock' || key === 'price') {
        return direction === 'ascending' ? a[key] - b[key] : b[key] - a[key];
      }
      return 0;
    });

    setProducts(sortedProducts);
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null; 
    }

    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  const handleDelete = async (productId, productName) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${productName}?`);
    if (confirmed) {
      try {
        await axios.delete(`/api/products/${productId}`);
        toast.success(`${productName} deleted successfully`);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } catch (error) {
        toast.error(`Failed to delete ${productName}: ${error.message}`);
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleUpdate = (productId) => {
    navigate(`/updateproduct/${productId}`);
  };
  if (userType === 'admin') {
  return (
    <div>
      <h1 className="products-title">Products List</h1>
      <h1 className='table-info-text'>You can sort table by clicking table column names.</h1>
      <div className="products-wrapper">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <table className="products-table">
          <thead>
            <tr>
              <th onClick={() => sortTable('productname')}>
                Product Name {getSortIcon('productname')}
              </th>
              <th onClick={() => sortTable('stock')}>
                Stock {getSortIcon('stock')}
              </th>
              <th onClick={() => sortTable('price')}>
                Price {getSortIcon('price')}
              </th>
              <th onClick={() => sortTable('color')}>Color {getSortIcon('color')}</th>
              <th onClick={() => sortTable('category')}>Category {getSortIcon('category')}</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.productname}</td>
                <td>{product.stock}</td>
                <td>{product.price}</td>
                <td>{product.color}</td>
                <td>{product.category}</td>
                <td><button className="btn2" onClick={() => handleUpdate(product._id)}>Update</button></td>
                <td><button className="btn2" onClick={() => handleDelete(product._id, product.productname)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn" onClick={() => { navigate('/adminpanel') }}>Back</button>
      </div>
    </div>
  );
};
}

export default Products;
