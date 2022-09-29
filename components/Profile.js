import React from 'react'
import { useState, useEffect } from 'react'
import { Grid, IconButton, Typography, ImageListItem, Button, Box } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import UploadIcon from '@mui/icons-material/Upload';
import GridOnIcon from '@mui/icons-material/GridOn';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';

export default function Profile() {
    const [dummyData, setDummyData] = useState({})

    const fetchData = async () => {
        const res = await fetch('/api/dummyDataLienzo') // Se vuelve a traer todos los datosControlador
        const data = await res.json()
        var newData = data
        setDummyData(newData[0])
    }

    useEffect(() => {
        fetchData();
    }, [])

    console.log(dummyData);
    return (
        <>
            <Box sx={{ mx: 60, mb: 2, borderBottom: 1 }}>
                <Grid container>
                    <Grid item xs={2}>
                        <IconButton>
                            <AccountCircleIcon sx={{ width: 100, height: 100 }} />
                        </IconButton>
                    </Grid>
                    <Grid item xs={8}>
                        <Box>
                            <Typography variant='h6'>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the  printer took a galley of type and scrambled it to make a type specimen book.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={0.5}>
                        <IconButton>
                            <UploadIcon />
                        </IconButton>

                    </Grid>
                    <Grid item xs={0.5}>
                        <IconButton>
                            <SettingsIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ mb: 2, mx: 90 }}>
                <Grid container >
                    <Grid item xs={6}>
                        <Button>
                            <GridOnIcon />Publicaciones
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button>
                            <TurnedInNotIcon />Guardados
                        </Button>

                    </Grid>
                </Grid>
            </Box>

            <Box className='gridContainerProfile' sx={{ mx: 60 }}>
                {dummyData.lienzoImg.map((img) => {
                    return (
                        <Button className='buttonImgProfile' key={img.title}>
                            < img
                                className='imgProfile'
                                src={`${img.img}?w=248&fit=crop&auto=format`
                                }
                                srcSet={`${img.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                width={200}
                                height={200}
                                alt='img'
                            />
                        </Button>
                    )
                })}
            </Box>
        </>
    )
}
