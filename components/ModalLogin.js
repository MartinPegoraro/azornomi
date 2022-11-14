import React, { useState } from 'react'
import { Typography, Box, Modal, Grid, IconButton, Button, TextField } from '@mui/material';
import Link from 'next/link';
import { userApi } from '../pages/api/user';

const ModalLogin = ({ open, handleClose }) => {
    const [form, setForm] = useState({ email: '', password: '' })

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setForm({
            ...form,
            [name]: value
        });
    }

    const handleSubmit = () => {
        console.log(form);
        userApi.loginUser(form)
    }

    const handleChangePass = () => {
        console.log('cambiar la pass');
    }
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='modalLogin'>
                    <Box>
                        <Typography variant='h6' sx={{ mb: 1, width: '70%', display: 'inline-block' }} >Inicia sesión en tu cuenta</Typography>
                    </Box>
                    <Box>
                        <Typography variant='caption' sx={{ width: '70%', display: 'inline-block' }} >Correo</Typography>
                        <TextField
                            onChange={onInputChange}
                            value={form.email}
                            name="email"
                            size='small'
                            sx={{ width: '70%', mb: 2, display: 'inline-block' }}
                            required
                            id="outlined-required"
                        />
                    </Box>
                    <Box>
                        <Typography variant='caption' sx={{ width: '70%', display: 'inline-block' }} >Contraseña</Typography>
                        <TextField
                            onChange={onInputChange}
                            value={form.password}
                            name="password"
                            size='small'
                            sx={{ width: '70%', mb: 1, display: 'inline-block' }}
                            id="outlined-password-input"
                            type="password"
                            autoComplete="current-password"
                        />
                    </Box>
                    <Box>
                        <Link href='/changePassword'>
                            <Button onClick={handleChangePass} color="secondary" sx={{ mb: 4 }}>
                                <Typography variant='caption' sx={{ display: 'inline-block', textTransform: "capitalize" }} >Olvidate tu contraseña?</Typography>
                            </Button>
                        </Link>
                    </Box>
                    <Link href='/homeCanvas'>
                        <Button variant="contained" color="success" onClick={handleSubmit}>
                            LOGIN
                        </Button>
                    </Link>
                </Box>
            </Modal>
        </>
    )
}

export default ModalLogin