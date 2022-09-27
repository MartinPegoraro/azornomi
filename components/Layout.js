import React from 'react'
import Container from '@mui/material/Container';
import NavBar from './NavBar';


export default function Layout({ children, pageName }) {
    return (
        <Container disableGutters={true}
            sx={{
                minHeight: '100vh',
                maxHeight: "100vh",
                minWidth: '100vw',
                maxWidth: "100vw"
            }}
        >
            <NavBar title={pageName} />

            {children}
        </Container>
    )
}