import React, { useState } from 'react'
import Link from 'next/link'
import { Box, Grid, Button, Avatar, IconButton, Typography, TextField } from '@mui/material'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { red, green, grey } from '@mui/material/colors';
import ModalLogin from './ModalLogin';
import ModalCheckIn from './ModalCheckIn';
import axios from 'axios';
import { textAlign } from '@mui/system';


export default function ChangePass() {
    return (
        <>
            <Box className='boxLogin'>
                <Grid container sx={{ height: 40, mt: 1 }}>
                    <Grid item xs={0.4} sx={{ position: 'relative' }}>
                        <IconButton className='iconButtonLogin' size='medium'>
                            <Avatar
                                alt="AzorÑomi"
                                src="/azorñomi.png"
                                sx={{ width: 40, height: 40 }}
                            />
                        </IconButton>
                    </Grid>
                    <Grid item xs={10.2} sx={{ position: 'relative' }}>
                        <Typography variant='h6' sx={{ position: 'absolute', top: '10%' }}> Azoromi</Typography>
                    </Grid>

                    <Grid item xs={1.2} sx={{ position: 'relative' }}>
                        <Link href='/'>
                            <Button variant="text" component="label" size="small" sx={{ textAlign: 'right', position: 'absolute', top: '10%' }}>
                                <KeyboardReturnIcon />
                                <Typography variant='caption'> Volver al Inicio</Typography>
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Box >
            <Box sx={{ textAlign: 'center', mx: 45, mt: 10, border: '1px solid black' }}>
                <Box>
                    <Typography variant='caption' sx={{ width: '70%', display: 'inline-block' }} >Correo</Typography>
                    <TextField
                        name="email"
                        size='small'
                        sx={{ width: '70%', mb: 2, display: 'inline-block' }}
                        required
                        id="outlined-required"
                    />
                </Box>
                <Button variant="contained" color="success" sx={{ textTransform: "capitalize" }}>
                    Enviar mensaje
                </Button>
                <Box>
                    <Typography variant='caption' sx={{ width: '70%', display: 'inline-block' }} >Ingresar codigo</Typography>
                    <TextField
                        name="email"
                        size='small'
                        sx={{ width: '70%', mb: 2, display: 'inline-block' }}
                        required
                    />
                </Box>
                <Button variant="contained" color="success" sx={{ textTransform: "capitalize" }} >
                    Enviar codgio
                </Button>
            </Box>
        </>
    )
}
