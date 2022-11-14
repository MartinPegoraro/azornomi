import React from 'react'
import { useRouter } from 'next/router'
import { useState, useEffect, useCallback } from 'react'
import NavBar from './NavBar'
import { Box, Typography, Grid, Button, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function InboxMsg() {
    const router = useRouter()
    const stateUser = router.query.type
    const [dummyData, setDummyData] = useState([])
    const [message, setMassage] = useState('')


    const onInputChange = ({ target }) => {
        const { value } = target;
        setMassage(value);
    }

    console.log(router.query, 'router');
    const imgUser = router.query.img

    const sendMessage = () => {
        const user = localStorage.getItem('user')
        const formMessage = {
            idChat: '1',
            message: message,
            idArtist: user.appRole === 'artist' ? user._id : null,
            idCanva: user.appRole === 'canva' ? user._id : null
        }
        // socket.emit('newMessage', formMessage)
    }

    const fetchData = useCallback(async () => {
        const typeUser = router.query.type
        const idUser = parseInt(router.query.idMsg)
        const resLienzo = await fetch('/api/dummyDataLienzo')
        const resArtist = await fetch('/api/dummyData')
        const dataLienzo = await resLienzo.json()
        const dataArtisti = await resArtist.json()
        if (typeUser === 'artista') {
            const newData = dataArtisti.find((user) => {
                return user.artistId === idUser
            })
            setDummyData(newData)

        } else {
            const newData = dataLienzo.find((user) => {
                return user.lienzoId === idUser
            })
            setDummyData(newData)
        }
    }, [router])

    useEffect(() => {
        fetchData()
        socket.emit("join")
    }, [fetchData])

    console.log(dummyData);

    return (
        <>
            <NavBar stateUser={stateUser} />
            {dummyData?.type === 'artista'
                ?
                <Grid container>
                    <Grid item xs={6.5}>
                        <Box sx={{ margin: 2, p: 1, width: '50%', borderRadius: 3, border: 1, background: 'yellow' }}>
                            <Typography variant='caption'> Recordatorio: Esperar hasta que la otra parte conteste antes de realizar el pago.</Typography>
                        </Box>
                        <Box sx={{ margin: 2, p: 1, width: '70%', borderRadius: 3, border: 1, background: 'rgb(234, 234, 234)' }}>
                            <Typography variant='h5' sx={{ margin: 1 }}>Artista</Typography>
                            <Typography variant='h6' sx={{ margin: 1 }}>Nombre: {dummyData?.artistName} {dummyData?.artistLastName}</Typography>
                            <Typography variant='h6' sx={{ margin: 1 }}>Edad: 48 años</Typography>
                            <Typography variant='h6' sx={{ margin: 1 }}>Ubicacion: Villa Fiorito</Typography>


                        </Box>
                        <Grid container sx={{ m: 2, mt: 3.5 }}>
                            <Grid item xs={3.5}>
                                <img
                                    className='imgInboxMsg'
                                    src={imgUser}
                                    width={210}
                                    height={300}
                                    alt='img'
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <Button className='buttonInboxMsg' sx={{ mb: 5, mt: 6 }} variant='contained' >Transferir</Button>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item xs={5.5} >
                        <Box sx={{ border: 1, m: 2, ml: 20, mr: 10, height: '80vh', borderRadius: 3 }}>
                            <Box sx={{ height: '90%', width: '100%' }}></Box>
                            <Grid container>
                                <Grid item xs={10}>
                                    <TextField
                                        size='small'
                                        sx={{ width: '95%', background: 'rgb(241, 241, 241)', ml: '1%' }}
                                        variant="outlined"
                                        required
                                        id="outlined-required"
                                        placeholder='Escriba un mensaje aqui'
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Button variant='contained'>
                                        <SendIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                :
                <Grid container>
                    <Grid item xs={6.5}>
                        <Box sx={{ margin: 2, p: 1, width: '50%', borderRadius: 3, border: 1, background: 'yellow' }}>
                            <Typography variant='caption'> Recordatorio: La transferencia se realizará una vez que el lienzo reciba su diseño terminado.</Typography>
                        </Box>
                        <Box sx={{ margin: 2, p: 1, width: '70%', borderRadius: 3, border: 1, background: 'rgb(244, 244, 244)' }}>
                            <Typography variant='h5' sx={{ margin: 1 }}>Lienzo</Typography>
                            <Typography variant='h6' sx={{ margin: 1 }}>Nombre: {dummyData?.lienzoName} {dummyData?.lienzoLastName}</Typography>
                            <Typography variant='h6' sx={{ margin: 1 }}>Edad: 48 años</Typography>
                            <Typography variant='h6' sx={{ margin: 1 }}>Ubicacion: Villa Fiorito</Typography>


                        </Box>
                        <Grid container sx={{ m: 2, mt: 3.5 }}>
                            <Grid item xs={3.5}>
                                <img
                                    className='imgInboxMsg'
                                    src={imgUser}
                                    width={210}
                                    height={300}
                                    alt='img'
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <Button className='buttonInboxMsg' sx={{ mb: 5, mt: 6 }} variant='contained' >Enviar Diseño</Button>
                                <Button className='buttonInboxMsg' variant='contained'>Calamar</Button>

                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item xs={5.5} >
                        <Box sx={{ border: 1, m: 2, ml: 20, mr: 10, height: '80vh', borderRadius: 3 }}>
                            <Box sx={{ height: '90%', width: '100%' }}></Box>
                            <Grid container>
                                <Grid item xs={10}>
                                    <TextField
                                        onChange={onInputChange}
                                        size='small'
                                        sx={{ width: '95%', background: 'rgb(241, 241, 241)', ml: '1%' }}
                                        variant="outlined"
                                        required
                                        id="outlined-required"
                                        placeholder='Escriba un mensaje aqui'
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Button variant='contained' onClick={sendMessage}>
                                        <SendIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>

                    </Grid>
                </Grid>
            }
        </>


    )
}
