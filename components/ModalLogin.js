import React from 'react'
import { Typography, Box, Modal, Grid, IconButton, Button, TextField } from '@mui/material';
import Link from 'next/link';


const ModalLogin = ({ open, handleClose }) => {
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock='true'
            >
                <Box className='modalLogin'>
                    <Box>
                        <Typography variant='h6' sx={{ mb: 1, width: '70%', display: 'inline-block' }} >Inicia sesión en tu cuenta</Typography>
                    </Box>
                    <Box>
                        <Typography variant='caption' sx={{ width: '70%', display: 'inline-block' }} >Nombre de usuario</Typography>
                        <TextField
                            sx={{ width: '70%', mb: 2, display: 'inline-block' }}
                            required
                            id="outlined-required"
                        />
                    </Box>
                    <Box>
                        <Typography variant='caption' sx={{ width: '70%', display: 'inline-block' }} >Contraseña</Typography>
                        <TextField
                            sx={{ width: '70%', mb: 1, display: 'inline-block' }}
                            id="outlined-password-input"
                            type="password"
                            autoComplete="current-password"
                        />
                    </Box>
                    <Box>
                        <Typography variant='caption' sx={{ width: '70%', mb: 4, display: 'inline-block' }} >Olvidates tu contraseña?</Typography>
                    </Box>
                    <Link href='/homeCanvas'>
                        <Button variant="contained" color="success">
                            LOGIN
                        </Button>
                    </Link>
                </Box>
            </Modal>
        </>
    )
}

export default ModalLogin