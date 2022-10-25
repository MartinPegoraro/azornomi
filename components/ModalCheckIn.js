import React from 'react'
import { Typography, Box, Modal, Grid, IconButton, Button, TextField } from '@mui/material';
import Link from 'next/link';


const ModalCheckIn = ({ openChekIn, handleCloseCheckIn }) => {
    return (
        <>
            <Modal
                open={openChekIn}
                onClose={handleCloseCheckIn}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='modalCheckIn'>
                    <Box>
                        <Typography variant='h6' sx={{ width: '70%', display: 'inline-block' }} >Registrate aqui</Typography>

                    </Box>
                    <Box>
                        <Typography variant='caption' sx={{ width: '70%', display: 'inline-block' }} >Nombre</Typography>
                        <TextField
                            sx={{ width: '70%', display: 'inline-block' }}
                            required
                            id="outlined-required"
                        />
                    </Box>
                    <Box>
                        <Typography variant='caption' sx={{ width: '70%', display: 'inline-block' }} >Apellido</Typography>
                        <TextField
                            sx={{ width: '70%', display: 'inline-block' }}
                            required
                            id="outlined-required"
                        />
                    </Box>

                    <Box>
                        <Typography variant='caption' sx={{ width: '70%', display: 'inline-block' }} >Correo</Typography>
                        <TextField
                            sx={{ width: '70%', display: 'inline-block' }}
                            required
                            id="outlined-required"
                        />
                    </Box>
                    <Box>
                        <Typography variant='caption' sx={{ width: '70%', display: 'inline-block' }} >Contraseña</Typography>
                        <TextField
                            sx={{ width: '70%', mb: 2, display: 'inline-block' }}
                            id="outlined-password-input"
                            type="password"
                            autoComplete="current-password"
                        />
                    </Box>

                    <Link href='/homeCanvas'>
                        <Button variant="contained" color="success">
                            Registrarse
                        </Button>
                    </Link>
                </Box>
            </Modal>
        </>
    )
}

export default ModalCheckIn