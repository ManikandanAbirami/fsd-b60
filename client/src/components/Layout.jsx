import React from 'react'
import Navbar from './navbar/Navbar'
import container from '@mui/material/Container'

function Layout({ children }) {
    return (
        <>
            <Navbar />
            <container style={{ marginTop: '20px' }}>
                {children}
            </container>
        </>
    )
}

export default Layout