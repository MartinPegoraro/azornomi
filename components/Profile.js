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
import ModalViewImgProfile from './ModalViewImgProfile'
import { userApi } from '../pages/api/user';


export default function Profile() {
    const [user, setUser] = useState()
    const [userImgSave, setUserImgSave] = useState()
    const [image, setImage] = useState()
    const [publicationSave, setPublicationSave] = useState()


    const [publication, setPublication] = useState(true)
    const [openViewImg, setOpenViewImg] = useState(false)

    const [userLocalStorage, setUserLocalStorage] = useState()

    const [open, setOpen] = useState(false);
    const [openUploadImg, setOpenUploadImg] = useState(false);

    const router = useRouter()

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const handleOpenUploadImg = () => {
        setOpenUploadImg(true);
    }
    const handleCloseUploadImg = () => setOpenUploadImg(false);

    const handleOpenViewImg = async (img) => {
        if (img.idUserCreateImg) {
            const foundUser = await userApi.getOneUser(img.idUserCreateImg)
            if (foundUser?.status === 200) {
                setImage(img)
                setUserImgSave(foundUser?.body)
                setOpenViewImg(true);
                const formData = {
                    idImage: img?._id,
                    idUserSaveImg: userLocalStorage?._id,
                    idUserCreateImg: foundUser?.body?._id,
                    imageId: img?.imageId
                }
                const foundSaveImg = await userApi.getImgSave(formData)
            }
        } else {
            const foundUser = await userApi.getOneUser(img.userPost)
            if (foundUser?.status === 200) {
                setImage(img)
                setUserImgSave(foundUser?.body)
                setOpenViewImg(true);
                const formData = {
                    idImage: img?._id,
                    idUserSaveImg: userLocalStorage?._id,
                    idUserCreateImg: foundUser?.body?._id,
                    imageId: img?.imageId
                }
                const foundSaveImg = await userApi.getImgSave(formData)


            }
        }

    }

    const handleCloseViewImg = () => setOpenViewImg(false);


    const handleClickFalse = () => {
        setPublication(false)
    }
    const handleClickTrue = () => {
        setPublication(true)
    }

    const handleDeleteUser = async () => {
        if (user.appRole === 'canva') {
            const res = await userApi.deleteUserCanva(user._id)
            if (res?.data?.status === 200) {
                localStorage.setItem("user", '')
                localStorage.setItem("token", '')
                router.push('/')
            }

        } else {
            const res = await userApi.deleteUserArtist(user._id)
            if (res?.data?.status === 200) {
                localStorage.setItem("user", '')
                localStorage.setItem("token", '')
                router.push('/')
            }

        }
    }

    const handleLogout = async () => {
        localStorage.setItem("user", '')
        localStorage.setItem("token", '')
        router.push('/')
    }

    const fetchData = useCallback(async () => {
        setUserLocalStorage(JSON.parse(localStorage.getItem('user')))
        const idUser = router.query.id
        const resUser = await userApi.getOneUser(idUser)
        setUser(resUser?.body)
    }, [router])

    let idImg = Date.now()

    useEffect(() => {
        fetchData();
    }, [fetchData])

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
            <ModalViewImgProfile handleCloseViewImg={handleCloseViewImg}
                openViewImg={openViewImg}
                user={user}
                userImgSave={userImgSave}
                image={image}
                userLocalStorage={userLocalStorage}
                publicationSave={publicationSave}
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
                        : user?.appRole === 'artist'
                            ?
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
                                            {user?.lastName} {user?.firstName}
                                        </Typography>
                                        <Typography variant='h6'>
                                            {user?.nickName}
                                        </Typography>
                                        <Typography variant='h6'>
                                            {user?.genre}
                                        </Typography>
                                    </Box>
                                </Grid>

                            </>
                            :
                            <>
                                <Grid item xs={2}>
                                    <Avatar
                                        alt={user?.nickName}

                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Box>
                                        <Typography variant='h4'>
                                            El usuario a eliminado su cuenta
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
                                            <Button sx={{ textTransform: 'capitalize', borderBottom: 1 }} onClick={handleLogout}>
                                                Cerrar sesion
                                            </Button>
                                            <Button sx={{ textTransform: 'capitalize', borderBottom: 1 }} onClick={handleDeleteUser}>
                                                Eliminar cuenta
                                            </Button>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                            </>
                            :
                            <Grid item xs={2}>
                                <Link href={{
                                    pathname: `/profile/[id]/inbox/[idMsg]`,
                                    query: { id: user?._id, idMsg: idImg }
                                }} ><a>
                                        <Button ca variant="outlined" size="small" sx={{ mt: 0.7, float: 'right' }}>
                                            <Typography variant='caption' sx={{ textTransform: 'capitalize', color: 'black' }}>Enviar mensaje</Typography>
                                        </Button>
                                    </a>
                                </Link>
                            </Grid>
                    }
                </Grid>
            </Box>
            <Box sx={{ mb: 2, mx: 70 }}>
                <Grid container >
                    <Grid item xs={6}>
                        <Button onClick={handleClickTrue}>
                            <GridOnIcon />Publicaciones
                        </Button>
                    </Grid>
                    {
                        user?._id === userLocalStorage?._id
                        &&
                        <Grid item xs={6}>
                            <Button onClick={handleClickFalse}>
                                <TurnedInNotIcon />Guardados
                            </Button>

                        </Grid>
                    }
                </Grid>
            </Box>
            {
                publication ?
                    <Box className='gridContainerProfile' sx={{ mx: 40 }}>
                        {user?.imagesWork?.map((img, index) => {
                            return (
                                <>
                                    {
                                        !img.isDeleted &&
                                        <Button className='buttonImgProfile' key={index} onClick={() => handleOpenViewImg(img)}>
                                            < img
                                                className='imgProfile'
                                                src={`https://azoromi-img.s3.sa-east-1.amazonaws.com/imgUpload/${img?.imageId}.jpg`}
                                                width={200}
                                                height={200}
                                                alt='img'
                                            />
                                        </Button>
                                    }
                                </>
                            )
                        })}
                    </Box>
                    :
                    <Box className='gridContainerProfile' sx={{ mx: 40 }}>
                        {user?.imgSave?.map((img, index) => {
                            return (
                                <>
                                    {
                                        img.savedImg &&
                                        <Button className='buttonImgProfile' key={index} onClick={() => handleOpenViewImg(img)}>
                                            < img
                                                className='imgProfile'
                                                src={`https://azoromi-img.s3.sa-east-1.amazonaws.com/imgUpload/${img?.imageId}.jpg`}
                                                width={200}
                                                height={200}
                                                alt='img'
                                            />
                                        </Button>
                                    }
                                </>
                            )
                        })}
                    </Box>
            }

        </>
    )
}
