import React, { useState } from 'react'
import { Typography, Box, Modal, Grid, IconButton, Button, TextField } from '@mui/material';
import PhotoCamera from '@mui/icons-material/AddPhotoAlternate';
import Image from 'next/image'
import Link from 'next/link';


const ModalUpImg = ({ openUploadImg, handleCloseUploadImg }) => {
    const [img, setImg] = useState([])

    const handleChange = (e) => {
        console.log(e.target.files)
        setImg(e.target.files[0])
    }

    console.log(img.type);
    return (
        <>
            <Modal
                open={openUploadImg}
                onClose={handleCloseUploadImg}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box container className='modalUploadImg'>
                    <Grid container sx={{ height: '45%' }} >
                        <Grid item xs={3} >
                            <IconButton aria-label={"upload picture"} component={"label"}  >
                                <input hidden accept="image/*" type="file" onChange={handleChange} />
                                <PhotoCamera id='photoIcon' />
                            </IconButton>
                        </Grid>
                        <Grid item xs={9}>
                            <Box className='buttonImgUpload'>
                                < img
                                    className='imgUpload'
                                    src={`/img/${img.name}`}
                                    width={200}
                                    height={200}
                                    alt='img'
                                />
                            </Box>
                        </Grid>
                    </Grid>

                    <Box sx={{
                        mb: 3,
                        height: '45%'
                    }}>
                        <Typography variant='caption' sx={{ width: '100%', height: 30, display: 'inline-block' }}> Descripcion IMG</Typography>
                        <TextField
                            placeholder='descripcion'
                            multiline
                            size='small'
                            sx={{ display: 'inline' }}
                            required
                            id="outlined-required"
                        />
                    </Box>
                    <Box>
                        <Button variant="outlined" sx={{ textTransform: 'capitalize' }}>Subir foto</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default ModalUpImg