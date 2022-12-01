import React, { useState, useEffect, useCallback } from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import { Typography, Box, Modal, Grid, IconButton } from '@mui/material';
import Link from 'next/link';
import { pink } from '@mui/material/colors';
import { userApi } from '../pages/api/user';

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


const ModalInfoCanva = ({ handleClose, open, dataModal, user }) => {
    const [saveImg, setSaveImg] = useState(false)
    const [userLocalStorage, setUserLocalStorage] = useState()

    const handleClick = () => {
        setSaveImg(true)
    }

    const handleClickDelete = () => {
        setSaveImg(false)
    }

    const axiosData = useCallback(async () => {
        // let localStorageId = JSON.parse(localStorage.getItem('user'))
        // await setUserLocalStorage(JSON.parse(localStorage.getItem('user')))
        // const formData = {
        //     idImage: dataModal?._id,
        //     idUserSaveImg: userLocalStorage?._id,
        //     idUserCreateImg: user?._id,
        //     imageId: dataModal?.imageId
        // }
        // // setForm({ userLocalStorage?._id, dataModal?.imageId, user?._id })
        // const foundSaveImg = await userApi.getSaveImg(formData)
    }, [])

    console.log(dataModal);
    useEffect(() => {
        axiosData()
    }, [axiosData])

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
                            src={`https://azoromi-img.s3.sa-east-1.amazonaws.com/imgUpload/${dataModal?.imageId}.jpg`}
                            width='100%'
                            height='100%'
                            alt='img'
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Box sx={{ width: '100%', mt: '5%', mb: '55%', textAlign: 'center' }}>
                            <Link href={{
                                pathname: `/profile/[id]/inbox/[idMsg]`,
                                query: { id: user?._id, img: dataModal?.imageId }
                            }}><a>
                                    <IconButton >
                                        <ChatIcon className='iconModal' />
                                    </IconButton>
                                    <Typography variant='h6'>Chat</Typography>
                                </a>
                            </Link>
                        </Box>
                        <Box sx={{ width: '100%', mb: '55%', textAlign: 'center' }}>
                            <Link href={{
                                pathname: '/profile/[id]',
                                query: { id: user?._id }
                            }} ><a>
                                    <IconButton >
                                        <AccountCircleIcon className='iconModal' />
                                    </IconButton>
                                    <Typography variant='h6'>Perfil</Typography>
                                </a>
                            </Link>
                        </Box>
                        {
                            saveImg ?
                                <Box sx={{ width: '100%', textAlign: 'center' }} >
                                    <IconButton onClick={handleClickDelete}>
                                        <BookmarkIcon sx={{ color: 'red', width: 45, height: 45 }} />
                                    </IconButton>
                                    <Typography variant='h6' >Guardar</Typography>

                                </Box>
                                :
                                <Box sx={{ width: '100%', textAlign: 'center' }}>
                                    <IconButton onClick={handleClick}>
                                        <TurnedInNotIcon className='iconModal' />
                                    </IconButton>
                                    <Typography variant='h6' >Guardar</Typography>

                                </Box>
                        }
                    </Grid>
                    <Grid item xs={5}>
                        <Box className='boxModal' sx={{ p: 2 }}>
                            <Typography variant='h5' sx={{ p: 2, textAlign: 'center' }}>{user?.nickName} {user?.lastName}</Typography>                            <Typography variant='h8'>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            </Typography>


                        </Box>
                    </Grid>


                </Grid>
            </Modal>
        </div>
    )
}



export default ModalInfoCanva