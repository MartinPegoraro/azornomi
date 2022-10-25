import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { Grid, IconButton, Typography, ImageListItem, Button, Box, Avatar, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';
import SettingsIcon from '@mui/icons-material/Settings';
import UploadIcon from '@mui/icons-material/Upload';
import GridOnIcon from '@mui/icons-material/GridOn';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router';
import { height } from '@mui/system';
import ModalSettings from './ModalSettings';


export default function Profile() {
    const [dummyData, setDummyData] = useState({ lienzoImg: [] })
    const [open, setOpen] = useState(false);
    const router = useRouter()
    console.log(router.query, 'router');


    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const fetchData = useCallback(async () => {
        const typeUser = router.query.type
        const idUser = parseInt(router.query.id)
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
        fetchData();
    }, [fetchData])

    console.log(dummyData);

    return (
        <>
            <ModalSettings handleClose={handleClose}
                open={open}
            />
            <Box sx={{ mx: 40, mb: 2, borderBottom: 1 }}>
                <Grid container>
                    {dummyData?.type === 'lienzo'
                        ?
                        <>
                            <Grid item xs={2}>
                                <Avatar
                                    alt={dummyData?.lienzoName}
                                    src={dummyData?.photoProfile}
                                    sx={{ width: 100, height: 100 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Box>
                                    <Typography variant='h4'>
                                        Lienzo
                                    </Typography>
                                    <Typography variant='h6'>
                                        Soy el lienzo {dummyData?.lienzoName}  {dummyData?.lienzoLastName}
                                    </Typography>
                                    <Typography variant='h6'>
                                        {dummyData?.lienzoLastName}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={2}>
                                <Link href={{
                                    pathname: `/profile/${dummyData.lienzoId}?${dummyData.type}/inbox/[id]`,
                                    query: { id: dummyData.lienzoId, type: dummyData.type }
                                }} ><a>
                                        <Button ca variant="outlined" size="small" sx={{ mt: 0.7, float: 'right' }}>
                                            <Typography variant='caption' sx={{ textTransform: 'capitalize', color: 'black' }}>Enviar mensaje</Typography>
                                        </Button>
                                    </a></Link>
                            </Grid>
                        </>
                        :
                        <>
                            <Grid item xs={2}>
                                <Avatar
                                    alt={dummyData?.artistName}
                                    src={dummyData?.photoProfile}
                                    sx={{ width: 100, height: 100 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Box>
                                    <Typography variant='h4'>
                                        Artista
                                    </Typography>
                                    <Typography variant='h6'>
                                        Soy el artista {dummyData?.artistName}{dummyData?.artistLastName}
                                    </Typography>
                                    <Typography variant='h6'>
                                        {dummyData?.artistLastName}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={2}>
                                <Button ca variant="outlined" size="small" sx={{ mt: 0.7, float: 'right' }}>
                                    <Typography variant='caption' sx={{ textTransform: 'capitalize', color: 'black' }}>Enviar mensaje</Typography>
                                </Button>
                            </Grid>
                        </>

                    }

                    <Grid item xs={0.5}>
                        <IconButton>
                            <UploadIcon />
                        </IconButton>

                    </Grid>
                    <Grid item xs={0.5}>
                        <Accordion sx={{ boxShadow: 'none', top: -5 }}>
                            <AccordionSummary
                                expandIcon={<IconButton><SettingsIcon /> </IconButton>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            />
                            <AccordionDetails sx={{ width: 150, boxShadow: '3px 3px 5px 5px rgb(239, 233, 233)', borderRadius: 5 }}>
                                <Button onClick={() => handleOpen()} sx={{ textTransform: 'capitalize', borderBottom: 1 }}>
                                    Editar perfil
                                </Button>
                                <Button sx={{ textTransform: 'capitalize' }}>
                                    Cerrar seccion
                                </Button>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ mb: 2, mx: 70 }}>
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
            {dummyData?.type === 'lienzo'                            // SI ES IGUAL A ARTISTA 
                ?
                <Box className='gridContainerProfile' sx={{ mx: 40 }}>
                    {dummyData?.lienzoImg?.map((img) => {
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
                :                                                       // SI ES IGUAL A ARTISTA 
                <Box className='gridContainerProfile' sx={{ mx: 40 }}>
                    {dummyData?.artistImg?.map((img) => {
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
            }
        </>
    )
}
