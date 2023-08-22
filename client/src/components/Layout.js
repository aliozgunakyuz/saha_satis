import React from 'react'
import NavigationBar from './NavigationBar'
import Footer from './Footer'

export default function Layout({children }) {
    return (
        <div>
            <NavigationBar />
            <p>&nbsp;</p>
            {children}
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <Footer />
        </div>
    )
}