import React, { useState, useEffect } from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import { Typography, Box, Modal, Grid, IconButton } from '@mui/material';
import Link from 'next/link';

const style = {
    position: 'absolute',
    width: '100%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const ModalInfoArtisti = ({ handleClose, open, dataModal }) => {
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Grid container className='modalImg' >
                    <Grid item xs={5}>
                        <img className='img'
                            src={dataModal.img}
                            width='100%'
                            height='100%'
                            alt='img'
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Box sx={{ width: '100%', mb: '60%', textAlign: 'center' }}>
                            <IconButton >
                                <ChatIcon className='iconModal' />
                            </IconButton>
                            <Typography variant='h5'>Chat</Typography>
                        </Box>
                        <Box sx={{ width: '100%', mb: '60%', textAlign: 'center' }}>
                            <Link href={{
                                pathname: '/profile/[id]',
                                query: { id: dataModal.lienzoId, type: dataModal.type }
                            }} ><a>
                                    <IconButton >
                                        <AccountCircleIcon className='iconModal' />
                                    </IconButton>
                                    <Typography variant='h5'>Perfil</Typography>
                                </a>
                            </Link>
                        </Box>
                        <Box sx={{ width: '100%', mb: '50%', textAlign: 'center' }}>
                            <IconButton >
                                <TurnedInNotIcon className='iconModal' />
                            </IconButton>
                            <Typography variant='h5'>Guardar</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={5}>
                        <Box className='boxModal'>
                            <Typography variant='h4' sx={{ textAlign: 'center' }}>{dataModal.lienzoName} {dataModal.lienzoLastName}</Typography>
                            <Typography className='tagsModalContainer' variant='h5'> Preference: {dataModal.preference.map((style) => {
                                return (
                                    <>
                                        <Typography className='tagsModal' variant='h6'>{style},</Typography>
                                    </>
                                )
                            })}</Typography>
                            <Typography variant='h8'>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            </Typography>


                        </Box>
                    </Grid>


                </Grid>
            </Modal>
        </div>
    )
}



export default ModalInfoArtisti