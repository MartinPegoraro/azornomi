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
import ModalUploadImg from './ModalUploadImg';
import { userApi } from '../pages/api/user';


export default function Profile() {
    const [user, setUser] = useState()
    const [userLocalStorage, setUserLocalStorage] = useState()

    const [open, setOpen] = useState(false);
    const [openUploadImg, setOpenUploadImg] = useState(false);

    const router = useRouter()

    const handleOpenUploadImg = () => {
        setOpenUploadImg(true);
    }

    const handleCloseUploadImg = () => setOpenUploadImg(false);


    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    // const fetchData = useCallback(async () => {
    //     const typeUser = router.query.type
    //     const idUser = parseInt(router.query.id)
    //     const resLienzo = await fetch('/api/dummyDataLienzo')
    //     const resArtist = await fetch('/api/dummyData')
    //     const dataLienzo = await resLienzo.json()
    //     const dataArtisti = await resArtist.json()
    //     if (typeUser === 'artista') {
    //         const newData = dataArtisti.find((user) => {
    //             return user.artistId === idUser
    //         })
    //         setDummyData(newData)

    //     } else {
    //         const newData = dataLienzo.find((user) => {
    //             return user.lienzoId === idUser
    //         })
    //         setDummyData(newData)
    //     }
    // }, [router])
    const fetchData = useCallback(async () => {
        setUserLocalStorage(JSON.parse(localStorage.getItem('user')))
        const idUser = router.query.id
        const resUser = await userApi.getOneUser(idUser)
        console.log(resUser, 'resUser');

        setUser(resUser)
    }, [router])

    useEffect(() => {
        fetchData();
    }, [fetchData])

    console.log(user);
    return (
        <>
            <ModalSettings
                handleClose={handleClose}
                open={open}
                user={user}
            />
            <ModalUploadImg handleCloseUploadImg={handleCloseUploadImg}
                openUploadImg={openUploadImg}
            />
            <Box sx={{ mx: 40, mb: 2, borderBottom: 1 }}>
                <Grid container>
                    {user?.appRole === 'canva'
                        ?
                        <>
                            <Grid item xs={2}>
                                <Avatar
                                    src={`https://azoromi-img.s3.sa-east-1.amazonaws.com/imgUpload/${user?.imagesProfile}.jpg`}
                                    sx={{ width: 100, height: 100 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Box>
                                    <Typography variant='h4'>
                                        Perfil de Lienzo
                                    </Typography>
                                    <Typography variant='h6'>
                                        {user?.nickName}  {user?.email}
                                    </Typography>
                                    <Typography variant='h6'>
                                        {user?.nickName}
                                    </Typography>
                                </Box>
                            </Grid>
                            {/* <Grid item xs={2}>
                                <Link href={{
                                    pathname: `/profile/${user._id}/inbox/[id]`,
                                    query: { id: user._id }
                                }} ><a>
                                        <Button ca variant="outlined" size="small" sx={{ mt: 0.7, float: 'right' }}>
                                            <Typography variant='caption' sx={{ textTransform: 'capitalize', color: 'black' }}>Enviar mensaje</Typography>
                                        </Button>
                                    </a></Link>
                            </Grid> */}
                        </>
                        :
                        <>
                            <Grid item xs={2}>
                                <Avatar
                                    alt={user?.nickName}
                                    src={`https://azoromi-img.s3.sa-east-1.amazonaws.com/imgUpload/${user?.imagesProfile}.jpg`}
                                    sx={{ width: 100, height: 100 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Box>
                                    <Typography variant='h4'>
                                        Artista
                                    </Typography>
                                    <Typography variant='h6'>
                                        Soy el artista {user?.lastName}{user?.firstName}
                                    </Typography>
                                    <Typography variant='h6'>
                                        {user?.nickName}
                                    </Typography>
                                </Box>
                            </Grid>

                        </>

                    }
                    {
                        user?._id === userLocalStorage?._id
                            ?
                            <>
                                <Grid item xs={0.5}>
                                    <IconButton onClick={handleOpenUploadImg}>
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
                                        <AccordionDetails sx={{ width: 200, boxShadow: '3px 3px 5px 5px rgb(239, 233, 233)', borderRadius: 5 }}>
                                            <Button onClick={() => handleOpen()} sx={{ textTransform: 'capitalize', borderBottom: 1 }}>
                                                Editar perfil
                                            </Button>
                                            <Link href='/changePassword'>
                                                <Button sx={{ textTransform: 'capitalize', borderBottom: 1 }} >
                                                    Cambiar contraseña
                                                </Button>
                                            </Link>
                                            <Button sx={{ textTransform: 'capitalize', borderBottom: 1 }}>
                                                Cerrar seccion
                                            </Button>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                            </>
                            :
                            <Grid item xs={2}>
                                <Button ca variant="outlined" size="small" sx={{ mt: 0.7, float: 'right' }}>
                                    <Typography variant='caption' sx={{ textTransform: 'capitalize', color: 'black' }}>Enviar mensaje</Typography>
                                </Button>
                            </Grid>
                    }
                </Grid>
            </Box>
            <Box sx={{ mb: 2, mx: 70 }}>
                <Grid container >
                    <Grid item xs={6}>
                        <Button>
                            <GridOnIcon />Publicaciones
                        </Button>
                    </Grid>
                    {
                        user?._id === userLocalStorage?._id
                        &&
                        <Grid item xs={6}>
                            <Button>
                                <TurnedInNotIcon />Guardados
                            </Button>

                        </Grid>
                    }
                </Grid>
            </Box>
            <Box className='gridContainerProfile' sx={{ mx: 40 }}>
                {user?.imagesWork?.map((img, index) => {
                    return (
                        <Button className='buttonImgProfile' key={index}>
                            < img
                                className='imgProfile'
                                src={`https://azoromi-img.s3.sa-east-1.amazonaws.com/imgUpload/${img?.imageId}.jpg`}
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
