import React, { useState } from 'react'
import { Typography, Box, Modal, Grid, IconButton, Button, TextField } from '@mui/material';
import Link from 'next/link';
import { userApi } from '../pages/api/user';

const ModalCheckIn = ({ openChekIn, handleCloseCheckIn }) => {
    const [form, setForm] = useState({ nickName: '', email: '', password: '', appRole: '' })

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setForm({
            ...form,
            [name]: value
        });
    }

    const handleSubmit = () => {
        console.log(form);
        userApi.registerUser(form)
    }

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
                        <Typography variant='caption' sx={{ width: '70%', display: 'inline-block' }} >Nombre de usuario</Typography>
                        <TextField
                            name='nickName'
                            value={form.nickName}
                            onChange={onInputChange}
                            size='small'
                            sx={{ width: '70%', display: 'inline-block' }}
                            required
                        />
                    </Box>
                    <Box>
                        <Typography variant='caption' sx={{ width: '70%', display: 'inline-block' }} >Correo</Typography>
                        <TextField
                            name='email'
                            value={form.email}
                            onChange={onInputChange}
                            size='small'
                            sx={{ width: '70%', display: 'inline-block' }}
                            required
                        />
                    </Box>
                    <Box>
                        <Typography variant='caption' sx={{ width: '70%', display: 'inline-block' }} >Contraseña</Typography>
                        <TextField
                            name='password'
                            value={form.password}
                            onChange={onInputChange}
                            size='small'
                            sx={{ width: '70%', mb: 2, display: 'inline-block' }}
                            id="outlined-password-input"
                            type="password"
                            autoComplete="current-password"
                        />
                    </Box>
                    <Box>
                        <Typography variant='caption' sx={{ width: '70%', display: 'inline-block' }} >Role</Typography>
                        <TextField
                            name='appRole'
                            value={form.appRole}
                            onChange={onInputChange}
                            size='small'
                            sx={{ width: '70%', mb: 2, display: 'inline-block' }}
                            required
                        />
                    </Box>

                    {/* <Link href='/homeCanvas'> */}
                    <Button variant="contained" color="success" onClick={handleSubmit}>
                        Registrarse
                    </Button>
                    {/* </Link> */}
                </Box>
            </Modal>
        </>
    )
}

export default ModalCheckIn