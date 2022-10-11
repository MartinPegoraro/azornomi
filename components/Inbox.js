import React from 'react'
import NavBar from './NavBar'
import { Grid, IconButton, Typography, ImageListItem, Button, Box, Avatar } from '@mui/material'
import { useRouter, useState, useEffect } from 'next/router'

export default function Inbox() {
    const router = useRouter()
    return (
        <>
            <NavBar />
            <Grid container >
                <Grid item xs={6}>
                    <Box sx={{ m: 1, height: 100, width: '95%', border: 1 }} >

                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ m: 1, height: 100, width: '95%', border: 1 }} >
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
