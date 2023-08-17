import React from 'react'
import NavigationBar from './NavigationBar'
import Footer from './Footer'

export default function Layout({children }) {
    return (
        <div className='flex flex-col'>
            <NavigationBar />
            <p>&nbsp;</p>
            {children}
            <p>&nbsp;</p>
            <Footer />
        </div>
    )
}