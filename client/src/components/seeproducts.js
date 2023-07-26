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

  const handleDelete = async (productId) => {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if(confirmed){
      try {
        await axios.delete(`/api/products/${productId}`);
        window.location.reload();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div>
        <h1 className="products-title">Products List</h1>
        <div className="products-wrapper">
        
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
                <td><button className="btn2" onClick={()=>{navigate('/adminpanel')}}>Update</button></td>
                <td><button className="btn2" onClick={() => handleDelete(product._id)}>Delete</button></td>
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
