import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';
import { useAuthStore } from '../store/store.js';
import useFetch from '../hoooks/hookk.js';
import '../styles/salesstyles.css';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


function Row(props) {
  let status;
  const handleAcceptClick = (saleId) => {
    status = 'Accepted';
    axios
      .put(`/api/updatesalestatus/${saleId}/${status}`)
      .then((response) => {
        props.onSaleStatusChange(); 
      })
      .catch((error) => {
        console.error('Error updating sale status:', error);
      });
  };

  const handleDeclineClick = (saleId) => {
    status = 'Declined';
    axios
      .put(`/api/updatesalestatus/${saleId}/${status}`)
      .then((response) => {
        props.onSaleStatusChange(); 
      })
      .catch((error) => {
        console.error('Error updating sale status:', error);
      });
  };

  const handleWaitingClick = (saleId) => {
    status = 'waiting...';
    axios
      .put(`/api/updatesalestatus/${saleId}/${status}`)
      .then((response) => {
        props.onSaleStatusChange(); 
      })
      .catch((error) => {
        console.error('Error updating sale status:', error);
      });
  };
    const { sale } = props;
    const [open, setOpen] = React.useState(false);
    const mail = useAuthStore((state) => state.auth.mail);
    const [{ isLoading, apiData, serverError }, setData] = useFetch(mail);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="sale">
            {sale.createdAt.substring(8,10)}.{sale.createdAt.substring(5,7)}.{sale.createdAt.substring(0,4)} / {sale.createdAt.substring(11,16)} 
          </TableCell>
          <TableCell align="right">{sale.username} {sale.usersurname}</TableCell>
          <TableCell align="right">{sale.clientname}</TableCell>
          <TableCell align="right">{sale.discountCode}</TableCell>
          <TableCell align="right">{sale.discountPercent}</TableCell>
          <TableCell align="right">
            {typeof sale.totalPrice === 'number'
              ? sale.totalPrice.toFixed(2)
              : 'N/A'}</TableCell>
          <TableCell align="right">
            {typeof sale.discountedPrice === 'number'
              ? sale.discountedPrice.toFixed(2)
              : 'No Discount Used'}
          </TableCell>
          <TableCell align="right">
          <span
            className={`sale-status ${sale.status === 'Accepted' ? 'green' : sale.status === 'Declined' ? 'red' : 'yellow'}`}
          >{sale.status}</span></TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
            <Collapse in={open} timeout="auto" unmountOnExit>
            
            <Box sx={{ margin: 1, width: '100%' }} >
                <Table size="small" >
                  <TableHead>
                    <TableRow>
                    {apiData.userType === 'admin' && (
                      <TableCell align="center">
                        <button 
                          className="btnaccept" 
                          style={{ fontSize: '15px', padding: '4px 8px',width: '70px' }} 
                          onClick={() => handleAcceptClick(sale._id)}
                          >Accept
                        </button>
                        &nbsp;
                        <button 
                          className="btnwaiting" 
                          style={{ fontSize: '15px', padding: '4px 8px',width: '70px' }} 
                          onClick={() => handleWaitingClick(sale._id,)}
                          >waiting...
                        </button>
                        &nbsp;
                        <button 
                          className="btndecline" 
                          style={{ fontSize: '15px', padding: '4px 8px',width: '70px' }} 
                          onClick={() => handleDeclineClick(sale._id)}
                          >Decline
                        </button>
                        
                        </TableCell>
                    )}
                    </TableRow>
                  </TableHead>
                </Table>
              </Box>
              <Box sx={{ margin: 1, width: '100%' }} >
                <Typography variant="h6" gutterBottom component="div">
                  <b>Salesman Informations</b>
                </Typography>
                <Table size="small" >
                  <TableHead>
                    <TableRow>
                      <TableCell><b>Name</b></TableCell>
                      <TableCell><b>Surname</b></TableCell>
                      <TableCell align="right"><b>Phone</b> </TableCell>
                      <TableCell align="right"><b>Mail</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      <TableRow >
                        <TableCell component="th" scope="row">
                          {sale.username}
                        </TableCell>
                        <TableCell>{sale.usersurname}</TableCell>
                        <TableCell align="right">{sale.userphone}</TableCell>
                        <TableCell align="right">{sale.usermail}</TableCell>
                      </TableRow>
                  </TableBody>
                </Table>
              </Box>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  <b>Client Informations</b>
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell><b>Name</b></TableCell>
                      <TableCell><b>Address</b></TableCell>
                      <TableCell align="right"><b>Phone</b> </TableCell>
                      <TableCell align="right"><b>Mail</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      <TableRow >
                        <TableCell component="th" scope="row">
                          {sale.clientname}
                        </TableCell>
                        <TableCell>{sale.clientaddress}</TableCell>
                        <TableCell align="right">{sale.clientphone}</TableCell>
                        <TableCell align="right">{sale.clientmail}</TableCell>
                      </TableRow>
                  </TableBody>
                </Table>
              </Box>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  <b>Sold Products Informations</b>
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell><b>Name</b></TableCell>
                      <TableCell><b>Category</b></TableCell>
                      <TableCell align="right"><b>Weight</b> </TableCell>
                      <TableCell align="right"><b>Quantity</b></TableCell>
                      <TableCell align="right"><b>Price</b></TableCell>
                      <TableCell align="right"><b>Total Price</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sale.products.map((product) => (
                      <TableRow key={product.productId}>
                        <TableCell component="th" scope="row">
                          {product.productName}
                        </TableCell>
                        <TableCell>{product.productCategory}</TableCell>
                        <TableCell align="right">{product.productWeight}</TableCell>
                        <TableCell align="right">{product.productQuantity}</TableCell>
                        <TableCell align="right">{product.productPrice}</TableCell>
                        <TableCell align="right">{(product.productPrice*product.productQuantity).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
export default function Seesales({ userType }) {
    const [finalSales, setFinalSales] = useState([]);
    const mail = useAuthStore((state) => state.auth.mail);
    const [{ isLoading, apiData, serverError }, setData] = useFetch(mail);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedSalesman, setSelectedSalesman] = useState('all');
    const [selectedClient, setSelectedClient] = useState('all');
    const [selectedDiscount, setSelectedDiscount] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');

    const handleSort = (columnName) => {
      if (sortColumn === columnName) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
        setSortColumn(columnName);
        setSortOrder('asc');
      }
    };

    const handleSaleStatusChange = () => {
      axios.get('/api/getfinalsales')
        .then((response) => {
          setFinalSales(response.data);
        })
        .catch((error) => {
          console.error('Error fetching final sales:', error);
        });
    };

    useEffect(() => {
      axios
        .get('/api/getfinalsales')
        .then((response) => {
          const sortedSales = response.data.sort((a, b) => {

            const aValue = a['createdAt'];
            const bValue = b['createdAt'];
    
            return bValue.toString().localeCompare(aValue.toString());
          });
    
          setFinalSales(sortedSales);
        })
        .catch((error) => {
          console.error('Error fetching final sales:', error);
        });
    }, []);

        const filteredSales = apiData.userType === 'admin'
        ? finalSales
        : finalSales.filter(sale => sale.usermail === apiData.mail);

        const filteredSalesBySalesman = selectedSalesman === 'all'
        ? filteredSales
        : filteredSales.filter(sale => sale.username === selectedSalesman);
    
        const filteredSalesByDiscount = selectedDiscount === 'all'
        ? filteredSales
        : filteredSales.filter(sale => sale.discountCode === selectedDiscount);

        const filteredSalesByClient = selectedClient === 'all'
        ? filteredSales
        : filteredSales.filter(sale => sale.clientname === selectedClient);

        const filteredSalesByStatus = selectedStatus === 'all'
        ? filteredSales
        : filteredSales.filter(sale => sale.status === selectedStatus);
      
        
        return (
            <Layout>
              <div className='paper-container'>
                
                <TableContainer component={Paper}>
                  
                <div className='flex flex-row justify-center menu-container'>
                <div className='text-center mb-10'>
                <label for="sale-dropdown text-custom-blue">Salesman Name:</label>
                <select
                  id="salesman-dropdown"
                  className="sale-dropdown"
                  onChange={(e) => setSelectedSalesman(e.target.value)}
                >
                  <option value="" disabled>
                    Select a Salesman
                  </option>
                  <option value="all">All</option>
                  {[...new Set(finalSales.map((sale) => sale.username))].map(
                    (username, index) => (
                      <option key={index} value={username}>
                        {username}
                      </option>
                    )
                  )}
                </select>
                </div>
                
                <div className='text-center mb-10'>
                <label for="sale-dropdown text-custom-blue">Client Name:</label>
                <select
                  id="client-dropdown"
                  className="sale-dropdown"
                  onChange={(e) => setSelectedClient(e.target.value)}
                >
                  <option value="" disabled>
                    Select Client
                  </option>
                  <option value="all">All</option>
                  {[...new Set(finalSales.map((sale) => sale.clientname))].map(
                    (clientname, index) => (
                      <option key={index} value={clientname}>
                        {clientname}
                      </option>
                    )
                  )}
                </select>
                </div>

                <div className='text-center mb-10'>
                <label for="discount-dropdown text-custom-blue">Discount Code:</label>
                <select
                  id="discount-dropdown"
                  className="sale-dropdown"
                  onChange={(e) => setSelectedDiscount(e.target.value)}
                >
                  <option value="" disabled>
                    Select Discount Code
                  </option>
                  <option value="all">All</option>
                  {[...new Set(finalSales.map((sale) => sale.discountCode))].map(
                    (discountcode, index) => (
                      <option key={index} value={discountcode}>
                        {discountcode}
                      </option>
                    )
                  )}
                </select>
                </div>

                <div className='text-center mb-10'>
                <label for="status-dropdown text-custom-blue">Status:</label>
                <select
                  id="status-dropdown"
                  className="sale-dropdown"
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="all">All</option>
                  {[...new Set(finalSales.map((sale) => sale.status))].map(
                    (status, index) => (
                      <option key={index} value={status}>
                        {status}
                      </option>
                    )
                  )}
                </select>
                </div>
                </div>
                <Box textAlign="center">
                  <b className='text-black'>You can sort by pressing table heads</b>
                </Box>
                    <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                        <TableCell />
                        <TableCell onClick={() => handleSort('createdAt')}><b>Date</b></TableCell>
                        <TableCell align="right" onClick={() => handleSort('username')}><b>Salesman</b></TableCell>
                        <TableCell align="right" onClick={() => handleSort('clientname')}><b>Client&nbsp;</b></TableCell>
                        <TableCell align="right"onClick={() => handleSort('discountCode')} ><b>Discount Code&nbsp;</b></TableCell>
                        <TableCell align="right"><b>Discount Percent&nbsp;</b></TableCell>
                        <TableCell align="right"><b>Total&nbsp;</b></TableCell>
                        <TableCell align="right"><b>Discounted Total&nbsp;</b></TableCell>
                        <TableCell align="right" onClick={() => handleSort('status')}><b>Status&nbsp;</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {filteredSalesByStatus
                      .filter(sale => selectedSalesman === 'all' || sale.username === selectedSalesman)
                      .filter(sale => selectedDiscount === 'all' || sale.discountCode === selectedDiscount)
                      .filter(sale => selectedClient === 'all' || sale.clientname === selectedClient)
                      .filter(sale => selectedStatus === 'all' || sale.status === selectedStatus)
                      .sort((a, b) => {
                        if (sortColumn) {
                          const aValue = a[sortColumn];
                          const bValue = b[sortColumn];
                          
                          if (sortColumn === 'discountPercent' || sortColumn === 'totalPrice') {
                            // For integer columns, compare as numbers
                            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
                          }
                          
                          // For string columns, use localeCompare
                          return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
                        }
                        return 0;
                      })
                      .map((sale) => (
                        <Row key={sale._id} sale={sale} onSaleStatusChange={handleSaleStatusChange} />
                      ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                </div>
            </Layout>
        );
      }