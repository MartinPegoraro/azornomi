import React, { useState } from 'react'
import { Typography, Box, Modal, Grid, IconButton, Button, TextField, Alert } from '@mui/material';
import PhotoCamera from '@mui/icons-material/AddPhotoAlternate';


import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Link from 'next/link';
import { userApi } from '../pages/api/user';
import { imgApi } from '../pages/api/img';


const ModalSettings = ({ open, handleClose, user }) => {
    const [img, setImg] = useState(undefined)
    const [formData, setFormData] = useState({ lastName: user?.lastName, firstName: user?.firstName, nickName: user?.nickName, genre: user?.genre, genderTatoo: user?.genderTatoo })
    const [imgUrl, setImgUrl] = useState('')
    const [idImage, setIdImage] = useState('')
    const [state, setState] = useState(false)
    const [savedCorrectly, setSavedCorrectly] = useState(false)

    const handleChange = (e) => {
        setImgUrl(e.target.files[0])
        setImg(URL.createObjectURL(e.target.files[0]))
    }

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleClickImg = async () => {
        let idImg = Date.now()
        setIdImage(idImg)
        var bodyFormData = new FormData();
        bodyFormData.append('id', idImg);
        bodyFormData.append('formato', 'jpg');
        bodyFormData.append('foto', imgUrl);
        const res = await imgApi.uploadImg(bodyFormData)
        if (res?.data?.status === 200) {
            const res = await imgApi.uploadImgProfile(user, idImg)
            setState(true)
            setTimeout(() => {
                setState(false)
            }, 1500)

        } else {
            console.log('surgio un problema');
        }
    }


    const handleChangeSelect = (event) => {
        setAge(event.target.value);
    };
    const handleClick = async (e) => {
        e.preventDefault()
        if (user.appRole === 'canva') {
            const res = await userApi.updateCanva(user, formData)
            if (res?.data?.status === 200) {
                setSavedCorrectly(true)
                setTimeout(() => {
                    setSavedCorrectly(false)
                    handleClose()
                    setFormData('')
                    location.reload()
                }, 1500)
            } else {
                console.log('error');
            }

        } else {
            const res = await userApi.updateArtist(user, formData)
            if (res?.data?.status === 200) {
                setSavedCorrectly(true)
                setTimeout(() => {
                    setSavedCorrectly(false)
                    handleClose()
                    setFormData('')
                    location.reload()
                }, 1500)
            } else {
                console.log('error');
            }
        }

    }
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='modalSettings'>

                    <Grid container sx={{ mb: 5 }}>
                        <Grid item xs={6}>
                            <Grid container sx={{ width: '90%', textAlign: 'center', mb: 4, p: 1, boxShadow: '1px 1px 3px 1px rgb(224, 224, 224)' }}>
                                <Grid item xs={6}>
                                    <Typography variant='caption' sx={{ width: '50%', display: 'inline-block' }} >Nombre</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        onChange={onInputChange}
                                        name='firstName'
                                        label={user?.firstName}
                                        value={formData.firstName}
                                        size='small'
                                        sx={{ width: '50%', mb: 2, display: 'inline' }}
                                        required
                                        id="outlined-required"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container sx={{ width: '90%', textAlign: 'center', p: 1, boxShadow: '1px 1px 3px 1px rgb(224, 224, 224)' }}>
                                <Grid item xs={6}>
                                    <Typography variant='caption' sx={{ width: '50%', display: 'inline-block' }} >Apellido</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        onChange={onInputChange}
                                        name='lastName'
                                        label={user?.lastName}
                                        value={formData.lastName}
                                        size='small'
                                        sx={{ width: '50%', mb: 2, display: 'inline' }}
                                        required
                                        id="outlined-required"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={6}>
                            <Grid container sx={{ width: '90%', textAlign: 'center', mb: 4, p: 1, boxShadow: '1px 1px 3px 1px rgb(224, 224, 224)' }}>
                                <Grid item xs={6}>
                                    <Typography variant='caption' sx={{ width: '50%', display: 'inline-block' }} >NickName</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        onChange={onInputChange}
                                        name='nickName'
                                        label={user?.nickName}
                                        value={formData.nickName}
                                        size='small'
                                        sx={{ width: '50%', mb: 2, display: 'inline' }}
                                        required
                                        id="outlined-required"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container sx={{ width: '90%', textAlign: 'center', p: 1, boxShadow: '1px 1px 3px 1px rgb(224, 224, 224)' }}>
                                <Grid item xs={6}>
                                    <Typography variant='caption' sx={{ width: '50%', display: 'inline-block' }} >Genero</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <InputLabel  >
                                        Seleccionar
                                    </InputLabel>
                                    <Select
                                        sx={{ height: 25 }}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={formData.genre}
                                        name='genre'
                                        label={user?.genre}
                                        onChange={onInputChange}
                                    >

                                        <MenuItem value='Hombre'>Hombre</MenuItem>
                                        <MenuItem value='Mujer'>Mujer</MenuItem>
                                    </Select>

                                    {/* <TextField
                                        onChange={onInputChange}
                                        name='genre'
                                        label={user?.genre}
                                        value={formData.genre}
                                        size='small'
                                        sx={{ width: '50%', mb: 2, display: 'inline' }}
                                        id="outlined-password-input"
                                        autoComplete="current-password"
                                    /> */}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container sx={{ width: '90%', textAlign: 'center', p: 1, boxShadow: '1px 1px 3px 1px rgb(224, 224, 224)' }}>
                                <Grid item xs={5}>
                                    <Typography variant='caption' sx={{ width: '50%', display: 'inline-block' }} >Imagen de perfil</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton aria-label={"upload picture"} component={"label"}  >
                                        <input hidden accept="image/*" type="file" onChange={handleChange} />
                                        <PhotoCamera />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={3}>
                                    <Box className='buttonImgUpload'>
                                        < img
                                            className='imgUpload'
                                            src={img}
                                            width={80}
                                            height={80}
                                            alt=''
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={1}>
                                    <Button sx={{ border: '0.5px solid black', m: 2 }} onClick={handleClickImg}>
                                        <Typography variant='caption' sx={{ textTransform: 'capitalize' }}>Guardar Imagen</Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                            {
                                state === true
                                &&
                                <Alert sx={{ width: '70%', p: 0, pl: 1, mt: 1 }} variant="filled" severity="success">se guardo la imagen correctamente</Alert>
                            }
                        </Grid>

                    </Grid>
                    <Button variant="contained" color="success" sx={{ display: 'inline' }} onClick={handleClick}>
                        <Typography variant='caption' sx={{ textTransform: 'capitalize' }}>Guardar</Typography>
                    </Button>
                    {
                        savedCorrectly === true
                        &&
                        <Alert sx={{ width: '100%', p: 0, pl: 1, mt: 1 }} variant="filled" severity="success">Se actualizaron los datos correctamente</Alert>
                    }

                </Box>
            </Modal>
        </>
    )
}

export default ModalSettings