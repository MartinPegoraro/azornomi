import React, { useState } from 'react'
import Link from 'next/link'
import { Box, Grid, Button, Avatar, IconButton, Typography, TextField, Alert } from '@mui/material'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { red, green, grey } from '@mui/material/colors';
import ModalLogin from './ModalLogin';
import ModalCheckIn from './ModalCheckIn';
import axios from 'axios';
import { userApi } from '../pages/api/user';
import { NextRequest } from 'next/server'
import { useRouter } from 'next/router'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


export default function ChangePass() {
    const [form, setForm] = useState({ email: '', password: '', codPassRecover: '', repitPassword: '' })

    const [forgetPass, setForgetPass] = useState(false)
    const [checkCod, setCheckCod] = useState(false)
    const [error, setError] = useState(false)
    const [confirmChangePassword, setConfirmChangePassword] = useState(false)


    const router = useRouter()


    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setForm({
            ...form,
            [name]: value
        });
    }

    const handleSendMsgEmail = async () => {
        const res = await userApi.sendMsgEmail(form)
        console.log(res.data.status, 'res');
        if (res?.data.status === 200) {
            setCheckCod(true)
            setError(false)
        } else {
            setCheckCod(false)
            setError(true)
        }
    }
    const handleCheckCod = async () => {
        const res = await userApi.checkCod(form)
        console.log(res.data.status, 'res');
        if (res?.data.status === 200) {
            setForgetPass(true)
            setError(false)
        } else {
            setForgetPass(false)
            setError(true)
        }
    }

    const handleForgetPass = async () => {
        const res = await userApi.forgetPassword(form)
        if (res?.data.status === 200) {
            setError(false)
            setConfirmChangePassword(true)
            setTimeout(() => {
                router.push('/')
            }, 2500)
        } else {
            setError(true)
        }
    }
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
            <Typography variant='h6' sx={{ textAlign: 'center', mt: 5, }}>Recupere su contraseña de manera rapida y segura</Typography>
            <Typography variant='h6' sx={{ textAlign: 'center', mb: 3 }}>Ingrese su correo y le enviaremos un codigo con el cual podra cambiar su contraseña</Typography>

            <Box sx={{ textAlign: 'center', mx: 45, border: '1px solid black', borderRadius: 5, background: 'rgb(236, 236, 236)' }}>
                <Box>
                    <Typography variant='caption' sx={{ width: '70%', display: 'inline-block' }} >Ingresar Correo</Typography>
                    <TextField
                        onChange={onInputChange}
                        name="email"
                        value={form.email}
                        size='small'
                        sx={{ width: '70%', display: 'inline-block' }}
                        required
                        id="outlined-required"
                    />
                </Box>
                {error && !checkCod
                    &&
                    <Box>
                        <Typography variant="caption" sx={{ color: 'red' }}>No ingreso un correo valido</Typography>
                    </Box>
                }
                <Button onClick={handleSendMsgEmail} variant="contained" color="success" sx={{ mb: 2, mt: 2, textTransform: "capitalize" }}>
                    Obtener Codigo
                </Button>
                {checkCod
                    &&
                    <Box>
                        <Box>
                            <Typography variant='caption' sx={{ width: '70%', display: 'inline-block' }} >Ingresar codigo</Typography>
                            <TextField
                                onChange={onInputChange}
                                name="codPassRecover"
                                value={form.codPassRecover}
                                size='small'
                                sx={{ width: '70%', display: 'inline-block' }}
                                required
                            />
                        </Box>
                        {error && !forgetPass
                            &&
                            <Box>
                                <Typography variant="caption" sx={{ color: 'red' }}>El codigo ingresa no es correcto</Typography>
                            </Box>
                        }
                        <Button onClick={handleCheckCod} variant="contained" color="success" sx={{ mt: 2, mb: 2, textTransform: "capitalize" }} >
                            Comprobar codigo
                        </Button>
                    </Box>
                }
                {forgetPass
                    &&
                    <Box>
                        <Box>
                            <Typography variant='caption' sx={{ width: '70%', display: 'inline-block' }} >Ingrese la nueva contraseña</Typography>
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
                            <Typography variant='caption' sx={{ width: '70%', display: 'inline-block' }} >Repita la contraseña</Typography>
                            <TextField
                                name='repitPassword'
                                value={form.repitPassword}
                                onChange={onInputChange}
                                size='small'
                                sx={{ width: '70%', display: 'inline-block' }}
                                id="outlined-password-input"
                                type="password"
                                autoComplete="current-password"
                            />
                        </Box>
                        {error
                            &&
                            <Box>
                                <Typography variant="caption" sx={{ color: 'red' }}>Las constraseñas no coinciden</Typography>
                            </Box>
                        }
                        <Button onClick={handleForgetPass} variant="contained" color="success" sx={{ mt: 2, mb: 2, textTransform: "capitalize" }} >
                            Cambiar Contraseña
                        </Button>
                        {confirmChangePassword && !error
                            &&
                            <Alert variant="filled" severity="success">Tu contraseña se ha cambiado con exito </Alert>
                        }
                    </Box>
                }
            </Box>
        </>
    )
}
