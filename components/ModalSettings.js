import React from 'react'
import { Typography, Box, Modal, Grid, IconButton, Button, TextField } from '@mui/material';
import Link from 'next/link';


const ModalSettings = ({ open, handleClose }) => {
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Grid container className='modalSettings'>
                    <Grid item xs={5}>
                        <Grid container sx={{ width: '90%', textAlign: 'center', p: 1, boxShadow: '1px 1px 3px 1px rgb(224, 224, 224)' }}>
                            <Grid item xs={6}>
                                <Typography variant='caption' sx={{ width: '50%', display: 'inline-block' }} >Nombre</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    sx={{ width: '50%', mb: 2, display: 'inline' }}
                                    required
                                    id="outlined-required"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={5}>
                        <Grid container sx={{ width: '90%', textAlign: 'center', p: 1, boxShadow: '1px 1px 3px 1px rgb(224, 224, 224)' }}>
                            <Grid item xs={6}>
                                <Typography variant='caption' sx={{ width: '50%', display: 'inline-block' }} >Apellido</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    sx={{ width: '50%', mb: 2, display: 'inline' }}
                                    required
                                    id="outlined-required"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={5}>
                        <Grid container sx={{ width: '90%', textAlign: 'center', p: 1, boxShadow: '1px 1px 3px 1px rgb(224, 224, 224)' }}>
                            <Grid item xs={6}>
                                <Typography variant='caption' sx={{ width: '50%', display: 'inline-block' }} >Contraseña</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    sx={{ width: '50%', mb: 1, display: 'inline' }}
                                    id="outlined-password-input"
                                    type="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={5}>
                        <Grid container sx={{ width: '90%', textAlign: 'center', p: 1, boxShadow: '1px 1px 3px 1px rgb(224, 224, 224)' }}>
                            <Grid item xs={6}>
                                <Typography variant='caption' sx={{ width: '50%', mb: 4, display: 'inline-block' }} >Correo</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    sx={{ width: '50%', mb: 1, display: 'inline' }}
                                    required
                                    id="outlined-required"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={5}>
                        <Grid container sx={{ width: '90%', textAlign: 'center', p: 1, boxShadow: '1px 1px 3px 1px rgb(224, 224, 224)' }}>
                            <Grid item xs={6}>
                                <Typography variant='caption' sx={{ width: '50%', display: 'inline-block' }} >Nombre de Usuario</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    sx={{ width: '50%', mb: 1, display: 'inline' }}
                                    id="outlined-password-input"
                                    type="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={5}>
                        <Grid container sx={{ width: '90%', textAlign: 'center', p: 1, boxShadow: '1px 1px 3px 1px rgb(224, 224, 224)' }}>
                            <Grid item xs={6}>
                                <Typography variant='caption' sx={{ width: '50%', mb: 4, display: 'inline-block' }} >Imagen de perfil</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    sx={{ width: '50%', mb: 2, display: 'inline' }}
                                    required
                                    id="outlined-required"
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Link href='/homeCanvas'>
                        <Button variant="contained" color="success">
                            save
                        </Button>
                    </Link>
                </Grid>
            </Modal>
        </>
    )
}

export default ModalSettings