// src/components/Products.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from the backend API
    axios.get('/api/getproducts')
      .then((response) => {
        setProducts(response.data); // Assuming the API returns an array of products
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleDelete = async (productId) => {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (confirmed) {
      try {
        await axios.delete(`/api/products/${productId}`);
        toast.success('Product deleted successfully');
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } catch (error) {
        toast.error('Failed to delete product');
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleUpdate = (productId) => {
    navigate(`/updateproduct/${productId}`);
  };

  return (
    <div>
      <h1 className="products-title">Products List</h1>
      <div className="products-wrapper">
        <Toaster position='top-center' reverseOrder={false}></Toaster>

        <table className="products-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Color</th>
              <th>Category</th>

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
                <td><button className="btn2" onClick={() => handleDelete(product._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn" onClick={() => { navigate('/adminpanel') }}>Back</button>
      </div>
    </div>
  );
};

export default Products;
