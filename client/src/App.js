import React from 'react'
import { createBrowserRouter, RouterProvider, useRoutes } from 'react-router-dom'

import Username from './components/Login';
import Password from './components/Password';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Register from './components/Register';
import Reset from './components/Reset';
import Home from './components/LandingPage'

import AdminPanel from './components/adminpanel.js'
import AddProduct from './components/addproduct.js'
import AddClient from './components/addclient.js'
import SeeClients from './components/seeclients.js'
import SeeProducts from './components/seeproducts.js'
import SeeSales from './components/seesales.js'
import SeeUsers from './components/seeusers.js'
import UpdateProduct from './components/updateproduct'
import UpdateClient from './components/updateclient'

import SeeDiscounts from './components/seediscounts.js'
import AddDiscount from './components/adddiscount.js'
//auth middle
import { AuthorizeUser, RouteProtection } from './midlleware/auth.js';
import NavigationBar from './components/NavigationBar';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Username></Username>
    },
    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: '/password',
        element: <RouteProtection><Password /></RouteProtection>
    },
    {
        path: '/profile',
        element: <AuthorizeUser><Profile /></AuthorizeUser>
    },
    {
        path: '/recovery',
        element: <Recovery></Recovery>
    },
    {
        path: '/reset',
        element: <Reset></Reset>
    },
    {
        path: '/adminpanel',
        element: <AdminPanel></AdminPanel>
    },
    {
        path: '/adminaddproduct',
        element: <AddProduct></AddProduct>
    },
    {
        path: '/adminaddclient',
        element: <AddClient></AddClient>
    },
    {
        path: '/seeproducts',
        element: <SeeProducts></SeeProducts>
    },
    {
        path: '/seeclients',
        element: <SeeClients></SeeClients>
    },
    {
        path: '/seesales',
        element: <SeeSales></SeeSales>
    },
    {
        path: '/seeusers',
        element: <SeeUsers></SeeUsers>
    },
    {
        path: '/updateproduct/:productId',
        element: <UpdateProduct></UpdateProduct>
    },
    {
        path: '/updateclient/:clientId',
        element: <UpdateClient></UpdateClient>
    },
    {
        path: '/homepage',
        element: <Home></Home>
    },
    {
        path: '/adddiscount',
        element: <AddDiscount></AddDiscount>
    },
    {
        path: '/seediscounts',
        element: <SeeDiscounts></SeeDiscounts>
    },


])

export default function App() {
    return (
        <main>
            <RouterProvider router={router}></RouterProvider>
        </main>
    )
}