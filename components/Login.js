import React, { useState } from 'react'
import Link from 'next/link'
import { Box, Grid, Button, Avatar, IconButton, Typography } from '@mui/material'
import { red, green } from '@mui/material/colors';


export default function Login({ stateUser }) {
    const [state, setState] = useState('')

    const handleClick = (e) => {
        if (e.target.value === 'lienzo') {
            setState('artista')

        } else {
            setState('lienzo')
        }
    }
    return (
        <>
            <Box className='boxHome'>
                <Grid container sx={{ height: 40, mt: 1 }}>
                    <Grid item xs={0.4} sx={{ position: 'relative' }}>
                        <IconButton className='iconButton' size='medium'>
                            <Avatar
                                alt="AzorÑomi"
                                src="/azorñomi.png"
                                sx={{ width: 40, height: 40 }}
                            />
                        </IconButton>
                    </Grid>
                    <Grid item xs={9} sx={{ position: 'relative' }}>
                        <Typography variant='h6' sx={{ position: 'absolute', top: '10%' }}> AzorÑomi</Typography>
                    </Grid>

                    <Grid item xs={1} sx={{ position: 'relative' }}>
                        <Link href='/homeCanvas'>
                            <Button variant="contained" component="label" size="small" color="error" sx={{ position: 'absolute', top: '10%', backgroundColor: red[500] }}>
                                <Typography variant='caption' > Iniciar seccion</Typography>
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item xs={1} sx={{ position: 'relative' }}>
                        <Button variant="contained" component="label" size="small" color="success" sx={{ position: 'absolute', top: '10%' }} >
                            <Typography variant='caption' > registrarse</Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Box >
            <Box sx={{ mt: 3 }}>
                <Grid container >
                    <Grid item xs={5} sx={{ height: 800 }}>
                        <img className='imgLogin'
                            src='https://www.filo.news/__export/1603471624804/sites/claro/img/2020/10/23/imagenes-de-blog-innova-001.jpg_423682103.jpg'
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

                        <Grid container sx={{ mx: 10, mt: 5 }}>
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
        </>
    )
}
