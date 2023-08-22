import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';
import { useAuthStore } from '../store/store.js';
import useFetch from '../hoooks/hookk.js';

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
    const { sale } = props;
    const [open, setOpen] = React.useState(false);
  
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
            {sale.createdAt}
          </TableCell>
          <TableCell align="right">{sale.username} {sale.usersurname}</TableCell>
          <TableCell align="right">{sale.clientname}</TableCell>
          <TableCell align="right">{sale.discountCode}</TableCell>
          <TableCell align="right">{sale.discountPercent}</TableCell>
          <TableCell align="right">{sale.totalPrice}</TableCell>
          <TableCell align="right">{sale.discountedPrice}</TableCell>
          <TableCell align="right">{sale.status}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
            <Collapse in={open} timeout="auto" unmountOnExit>
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
                        <TableCell align="right">{(product.productPrice*product.productQuantity)}</TableCell>
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

    useEffect(() => {
        axios.get('/api/getfinalsales')
            .then((response) => {
                setFinalSales(response.data);
            })
            .catch(error => {
                console.error('Error fetching final sales:', error);
            });
    }, []);

    const filteredSales = apiData.userType === 'admin'
        ? finalSales
        : finalSales.filter(sale => sale.usermail === apiData.mail);

        return (
            <Layout>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                        <TableCell />
                        <TableCell><b>Date</b></TableCell>
                        <TableCell align="right"><b>Salesman</b></TableCell>
                        <TableCell align="right"><b>Client&nbsp;</b></TableCell>
                        <TableCell align="right"><b>Discount Code&nbsp;</b></TableCell>
                        <TableCell align="right"><b>Discount Percent&nbsp;</b></TableCell>
                        <TableCell align="right"><b>Total&nbsp;</b></TableCell>
                        <TableCell align="right"><b>Discounted Total&nbsp;</b></TableCell>
                        <TableCell align="right"><b>Status&nbsp;</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            {filteredSales.map((sale) => (
                              <Row key={sale._id} sale={sale} />
                            ))}
                    </TableBody>
                    </Table>
                </TableContainer>
            </Layout>
        );
      }