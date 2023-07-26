import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/datashowstyles.css';
import {Link, useNavigate} from 'react-router-dom';

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

  return (
    <div>
        <h1 className="products-title">Products List</h1>
        <div className="products-wrapper">
        
        <table className="products-table">
            <thead>
            <tr>
                <th>Product ID</th>
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
                <td>{product._id}</td>
                <td>{product.productname}</td>
                <td>{product.stock}</td>
                <td>{product.price}</td>
                <td>{product.color}</td>
                <td>{product.category}</td>
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

export default Products;
