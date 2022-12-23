import React, { useState } from 'react'
import Link from 'next/link'
import { Box, Grid, Button, Avatar, IconButton, Typography, TextField } from '@mui/material'
import { red, green } from '@mui/material/colors';
import ModalLogin from './ModalLogin';
import ModalCheckIn from './ModalCheckIn';
import axios from 'axios';


export default function Login({ stateUser }) {
    const [state, setState] = useState('')
    const [value, setValue] = useState('')
    const [open, setOpen] = useState(false);
    const [openChekIn, setOpenCheckIn] = useState(false);

    const handleClick = async (e) => {
        console.log(value, 'value en habldeclick');
        const res = await axios.post('/api/dummyData', {
            "artistId": Date.now(),
            "type": value,
            "photoProfile": "https://e7.pngegg.com/pngimages/535/292/png-clipart-martin-palermo-boca-juniors-football-player-sport-football-tshirt-sport-thumbnail.png",
            "artistName": "Silvia",
            "artistLastName": "Ojeda",
            "artistStyle": ["tradicional", "dibujos", "Animados"],
        })
        const data = await res.data
        console.log(data);
    }

    const handleOpen = () => {
        setOpen(true);
    }
    const handleOpenCheckIn = () => {
        setOpenCheckIn(true);
    }
    const handleClose = () => setOpen(false);
    const handleCloseCheckIn = () => setOpenCheckIn(false);

    // const handleClick = (e) => {
    //     if (e.target.value === 'lienzo') {
    //         setState('artista')

    //     } else {
    //         setState('lienzo')
    //     }
    // }
    console.log(value);
    return (
        <div className='boxContainerLogin'>
            <ModalLogin handleClose={handleClose}
                open={open}
            />
            <ModalCheckIn handleCloseCheckIn={handleCloseCheckIn}
                openChekIn={openChekIn}
            />
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
                    <Grid item xs={9} sx={{ position: 'relative' }}>
                        <Typography variant='h6' sx={{ position: 'absolute', top: '10%' }}> Azoromi</Typography>
                    </Grid>

                    <Grid item xs={1.2} sx={{ position: 'relative' }}>
                        {/* <Link href='/homeCanvas'> */}
                        <Button onClick={() => handleOpen()} variant="contained" component="label" size="small" color="error" sx={{ position: 'absolute', top: '10%', backgroundColor: red[500] }}>
                            <Typography variant='caption' > Iniciar sesion</Typography>
                        </Button>
                        {/* </Link> */}
                    </Grid>
                    <Grid item xs={1.2} sx={{ position: 'relative' }}>
                        <Button onClick={() => handleOpenCheckIn()} variant="contained" component="label" size="small" color="success" sx={{ position: 'absolute', top: '10%' }} >
                            <Typography variant='caption' > registrarse</Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Box >
            <Box sx={{ mt: 3, height: 660 }}>
                <Grid container >
                    <Grid item xs={5} sx={{ height: 600 }}>
                        <img className='imgLogin'
                            src='https://www.gente.com.ar/wp-content/uploads/2021/07/Imagen.jpg'
                            width='100%'
                            height='100%'
                            alt='img'
                        />
                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant='h4' sx={{ textAlign: 'center' }}>
                            Encuentra ideas o bocetos de tatuajes y
                        </Typography>
                        <Typography variant='h4' sx={{ textAlign: 'center', color: 'red' }}>
                            diseñalos o terminalos
                        </Typography>

                        <Grid container sx={{ mt: 5 }}>
                            <Grid item sx={{ ml: 15 }} >
                                < img
                                    className='imgLogin'
                                    src='/img/tatuajes-en-el-cuello-para-hombres-6-1.jpg'
                                    width={250}
                                    height={300}
                                    alt='img'
                                />
                            </Grid>
                            <Grid item sx={{ mt: 10 }} >
                                < img
                                    className='imgLogin'
                                    src='https://i.pinimg.com/originals/c9/3d/94/c93d9489f028a4830711d0f1dd3d7765.jpg'
                                    width={250}
                                    height={300}
                                    alt='img'
                                />
                            </Grid>
                            <Grid item >
                                < img
                                    className='imgLogin'
                                    src='/img/tattoo-tribal-brazo-30.jpg'
                                    width={250}
                                    height={300}
                                    alt='img'
                                />
                            </Grid>

                        </Grid>

                    </Grid>
                </Grid>

            </Box>
        </div>
    )
}
