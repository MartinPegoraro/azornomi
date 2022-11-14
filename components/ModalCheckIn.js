import React, { useState } from 'react'
import { Typography, Box, Modal, Grid, IconButton, Button, TextField, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import Link from 'next/link';
import { userApi } from '../pages/api/user';

const ModalCheckIn = ({ openChekIn, handleCloseCheckIn }) => {
    const [form, setForm] = useState({ nickName: '', email: '', password: '', appRole: '', codEmail: '' })
    const [emailConfirm, setEmailConfirm] = useState(false)
    const [userExist, setUserExist] = useState(false)


    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setForm({
            ...form,
            [name]: value
        });
    }

    const handleSubmit = async () => {
        let expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        let isValidate = expReg.test(form.email)
        if (!isValidate) {
            alert('el correo no es valido')
        } else {

            if (form.appRole === 'artist') {
                const resArtist = await userApi.registerUserArtist(form)
                console.log(resArtist);
                if (resArtist.data.status === 201) {
                    setEmailConfirm(true)
                    setUserExist(false)
                } else[
                    setUserExist(true)

                ]
            } else {
                const resCanva = await userApi.registerUserCanva(form)
                console.log(resCanva);
                if (resCanva.data.status === 201) {
                    setEmailConfirm(true)
                    setUserExist(false)
                } else {
                    setUserExist(true)
                }
            }
        }

    }

    const handleSubmitConfirm = () => {
        console.log(form);
        userApi.confirmUser({ email: form.email, codEmail: form.codEmail })
    }

    console.log(form);

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
                    {userExist
                        &&
                        <Typography variant='caption' sx={{ color: 'red' }}>El correo ingresado ya existe</Typography>
                    }
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
                    <Box sx={{}}>
                        {/* <InputLabel id="demo-simple-select-label">Rol</InputLabel> */}
                        <Typography variant='caption' sx={{ width: '70%', display: 'inline-block' }} >Rol</Typography>

                        <Select
                            sx={{ width: '40%', mb: 2, }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name='appRole'
                            value={form.appRole}
                            onChange={onInputChange}
                        >
                            <MenuItem value='artist'>Artista</MenuItem>
                            <MenuItem value='canva'>Lienzo</MenuItem>
                        </Select>
                    </Box>

                    {/* <Link href='/homeCanvas'> */}
                    <Button variant="contained" color="success" onClick={handleSubmit}>
                        Registrarse
                    </Button>
                    {/* </Link> */}
                    {emailConfirm
                        &&
                        <Box sx={{ mt: 2 }}>
                            <Box>
                                <Typography variant='caption' sx={{ width: '70%', display: 'inline-block' }} >Codigo de Verificacion</Typography>
                                <TextField
                                    onChange={onInputChange}
                                    name='codEmail'
                                    value={form.codEmail}
                                    size='small'
                                    sx={{ width: '70%', mb: 2, display: 'inline-block' }}
                                    required
                                />
                            </Box>
                            <Button variant="contained" color="success" onClick={handleSubmitConfirm}>verificar</Button>
                        </Box>
                    }
                </Box>
            </Modal>
        </>
    )
}

export default ModalCheckIn