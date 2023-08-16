import React from 'react'
import NavigationBar from './NavigationBar'

export default function Layout({children }) {
    return (
        <div className='flex flex-col'>
            <NavigationBar />
            {children}
        </div>
    )
}
