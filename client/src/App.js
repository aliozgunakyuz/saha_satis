import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Username from './components/Login';
import Password from './components/Password';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Register from './components/Register';
import Reset from './components/Reset';


//auth middle
import { AuthorizeUser,RouteProtection } from './midlleware/auth.js';


const router = createBrowserRouter([
    {
        path:'/',
        element: <Username></Username>
    },
    {
        path:'/register',
        element: <Register></Register>
    },
    {
        path:'/password',
        element: <RouteProtection><Password /></RouteProtection>
    },
    {
        path:'/profile',
        element: <AuthorizeUser><Profile /></AuthorizeUser>
    },
    {
        path:'/recovery',
        element: <Recovery></Recovery>
    },
    {
        path:'/reset',
        element: <Reset></Reset>
    },


])


export default function App() {
    return(
        <main>
            <RouterProvider router={router}></RouterProvider>
        </main>
    )
}