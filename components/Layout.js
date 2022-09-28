import React from 'react'
import Container from '@mui/material/Container';
import NavBar from './NavBar';


export default function Layout({ children, stateUser }) {
    return (
        <Container disableGutters={true}
            sx={{
                minHeight: '100vh',
                maxHeight: "100vh",
                minWidth: '100vw',
                maxWidth: "100vw"
            }}
        >
            <NavBar stateUser={stateUser} />
            {children}
        </Container>
    )
}