import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import { Typography, Box, Modal, Grid, IconButton } from '@mui/material';
import Link from 'next/link';
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


const ModalInfoArtisti = ({ handleClose, open, dataModal, user, publicationSave }) => {
    const [saveImg, setSaveImg] = useState('')
    console.log(dataModal);
    const handleClick = async () => {
        const saveImgUser = await userApi.savePublication(publicationSave?._id, true)
        console.log(saveImgUser.data.body.savedImg, saveImgUser.data.body._id, 'handleClick');
        setSaveImg(saveImgUser.data.body.savedImg)
    }

    const handleClickDelete = async () => {
        const saveImgUser = await userApi.savePublication(publicationSave?._id, false)
        console.log(saveImgUser.data.body.savedImg, saveImgUser.data.body._id, 'handleClickDelete');
        setSaveImg(saveImgUser.data.body.savedImg)
    }

    let idImg = Date.now()

    useEffect(() => {
        // axiosData()
        setSaveImg(publicationSave?.savedImg)
    }, [publicationSave?.imageId])


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
                    {user !== null
                        ?

                        <>
                            <Grid item xs={2}>
                                <Box sx={{ width: '100%', mt: '5%', mb: '55%', textAlign: 'center' }}>
                                    <Link href={{
                                        pathname: `/profile/[id]/inbox/[idMsg]`,
                                        query: { id: user?._id, idMsg: dataModal?.imageId ? dataModal.imageId : idImg }
                                    }} ><a>
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
                                <Box sx={{ width: '100%', textAlign: 'center' }}>
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
                                </Box>
                            </Grid>
                        </>
                        :
                        <Grid item xs={2}>
                            <Typography variant='h6'>El usuario ya no existe</Typography>
                        </Grid>
                    }
                    <Grid item xs={5}>
                        <Box className='boxModal' sx={{ p: 2 }}>
                            <Typography variant='h4' sx={{ p: 2, textAlign: 'center' }}>nickname: {user?.nickName}</Typography>
                            <Typography variant='h4' sx={{ p: 2, textAlign: 'center' }}>{user?.firstName} {user?.lastName}</Typography>

                            <Typography variant='h6'>
                                Descripcion:
                                {dataModal?.description}
                            </Typography>


                        </Box>
                    </Grid>


                </Grid>
            </Modal>
        </div>
    )
}



export default ModalInfoArtisti