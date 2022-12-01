import React, { useState } from 'react'
import { Typography, Box, Modal, Grid, IconButton, Button, TextField, Snackbar, Alert } from '@mui/material';
import PhotoCamera from '@mui/icons-material/AddPhotoAlternate';
import Image from 'next/image'
import Link from 'next/link';

import { imgApi } from '../pages/api/img'

const ModalUpImg = ({ openUploadImg, handleCloseUploadImg }) => {
    const [img, setImg] = useState(undefined)
    const [imgUrl, setImgUrl] = useState('')
    const [form, setForm] = useState({ description: '' })
    const [state, setState] = useState(false)

    const onInputChange = ({ target }) => {
        console.log(target.value);
        const { name, value } = target;
        setForm({
            ...form,
            [name]: value
        });
    }

    const handleChange = (e) => {
        setImgUrl(e.target.files[0])
        setImg(URL.createObjectURL(e.target.files[0]))
    }

    const handleClick = async (e) => {
        let user = JSON.parse(localStorage.getItem('user'))
        let idImg = Date.now()
        var bodyFormData = new FormData();
        bodyFormData.append('id', idImg);
        bodyFormData.append('formato', 'jpg');
        bodyFormData.append('foto', imgUrl);

        const res = await imgApi.uploadImg(bodyFormData)
        if (res?.data.status === 200) {
            const res = await imgApi.uploadInUser(user, idImg, form.description)
            if (res?.data?.status === 200) {
                setState(true)
                setTimeout(() => {
                    setForm({ description: '' })
                    setImg(undefined)
                    setState(false)
                    handleCloseUploadImg()
                }, 1500)
            }
        } else {
            console.log('surgio un problema');
        }
    }

    return (
        <>
            <Modal
                open={openUploadImg}
                onClose={handleCloseUploadImg}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {/* <Snackbar
                    open={open.status}
                    autoHideDuration={6000}
                    message='que onda'
                /> */}
                <Box container className='modalUploadImg'>
                    <Grid container sx={{ height: '45%' }} >
                        <Grid item xs={3} >
                            <IconButton aria-label={"upload picture"} component={"label"}  >
                                <input hidden accept="image/*" type="file" onChange={handleChange} />
                                <PhotoCamera />
                            </IconButton>
                        </Grid>
                        <Grid item xs={9}>
                            <Box className='buttonImgUpload'>
                                < img
                                    className='imgUpload'
                                    src={img}
                                    width={200}
                                    height={200}
                                    alt=''
                                />
                            </Box>
                        </Grid>
                    </Grid>

                    <Box sx={{

                        height: '40%'
                    }}>
                        <Typography variant='caption' sx={{ width: '100%', height: 30, display: 'inline-block' }}> Descripcion IMG</Typography>
                        <TextField
                            fullWidth
                            name='description'
                            value={form.description}
                            onChange={onInputChange}
                            placeholder='descripcion'
                            multiline
                            required
                        />
                    </Box>
                    <Box>
                        <Button variant="outlined" onClick={handleClick} sx={{ textTransform: 'capitalize' }}>Subir foto</Button>
                    </Box>
                    {
                        state === true
                        &&
                        <Alert sx={{ width: '100%', p: 0, pl: 1, mt: 1 }} variant="filled" severity="success">Se guardo la imagen correctamente</Alert>
                    }

                </Box>
            </Modal>
        </>
    )
}

export default ModalUpImg