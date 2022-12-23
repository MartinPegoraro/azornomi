import React, { useState, useEffect, useCallback } from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Typography, Box, Modal, Grid, IconButton } from '@mui/material';
import Link from 'next/link';
import { pink } from '@mui/material/colors';
import { userApi } from '../pages/api/user';
import { useRouter } from 'next/router'


const ModalViewImgProfile = ({ handleCloseViewImg, openViewImg, user, userImgSave, image, userLocalStorage, publicationSave }) => {
    console.log("🚀 ~ file: ModalViewImgProfile.js:15 ~ ModalViewImgProfile ~ userImgSave", userImgSave)
    const router = useRouter()

    const [saveImg, setSaveImg] = useState(publicationSave?.savedImg)

    const handleClickDeleteImg = async () => {
        const deleteImg = await userApi.deleteImg(image._id)
    }
    const handleClick = async () => {
        // console.log(publicationSave?._id, 'handleClick');
        const saveImgUser = await userApi.savePublication(publicationSave._id, true)
        // console.log(saveImgUser.data.body.savedImg, saveImgUser.data.body._id, 'handleClick');
        setSaveImg(saveImgUser.data.body.savedImg)
    }

    const handleClickDelete = async () => {
        const saveImgUser = await userApi.savePublication(publicationSave?._id, false)
        // console.log(saveImgUser.data.body.savedImg, saveImgUser.data.body._id, 'handleClickDelete');
        setSaveImg(saveImgUser.data.body.savedImg)
    }

    let userParams = router.query.id


    return (
        <div>
            <Modal
                open={openViewImg}
                onClose={handleCloseViewImg}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Grid container className='modalImg' >
                    <Grid item xs={5}>
                        <img className='img'
                            src={`https://azoromi-img.s3.sa-east-1.amazonaws.com/imgUpload/${image?.imageId}.jpg`}
                            width='100%'
                            height='100%'
                            alt='img'
                        />
                    </Grid>
                    {userImgSave !== null
                        ?
                        <>
                            {userLocalStorage?._id !== image?.userPost
                                ?
                                <Grid item xs={2}>
                                    <Box sx={{ width: '100%', mt: '5%', mb: '55%', textAlign: 'center' }}>
                                        {/* {
                                userParams !== image?.userPost
                                && */}
                                        <Link href={{
                                            pathname: `/profile/[id]/inbox/[idMsg]`,
                                            query: { id: userImgSave?._id, idMsg: image?.imageId }
                                        }} ><a>
                                                <IconButton >
                                                    <ChatIcon className='iconModal' />
                                                </IconButton>
                                                <Typography variant='h6'>Chat</Typography>
                                            </a>
                                        </Link>
                                        {/* } */}
                                    </Box>
                                    <Box sx={{ width: '100%', mb: '55%', textAlign: 'center' }}>
                                        {/* {
                                userParams !== image?.userPost
                                && */}
                                        <Link href={{
                                            pathname: '/profile/[id]',
                                            query: { id: userImgSave?._id }
                                        }} ><a>
                                                <IconButton onClick={handleCloseViewImg}>
                                                    <AccountCircleIcon className='iconModal' />
                                                </IconButton>
                                                <Typography variant='h6'>Perfil</Typography>
                                            </a>
                                        </Link>
                                        {/* } */}
                                    </Box>
                                    {/* {
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
                            } */}
                                </Grid>
                                :
                                <Grid item xs={2}>
                                </Grid>

                            }
                        </>
                        :
                        <Grid item xs={2}>
                            <Typography variant='h6'>El usuario ya no existe</Typography>
                        </Grid>
                    }

                    <Grid item xs={5}>
                        <Box className='boxModal' sx={{ p: 2 }}>
                            <Typography variant='h5' sx={{ p: 2, textAlign: 'center' }}>{userImgSave?.nickName}</Typography>
                            <Typography variant='h5' sx={{ p: 2, textAlign: 'center' }}>{userImgSave?.firstName} {userImgSave?.lastName}</Typography>
                            {/* <Typography className='tagsModalContainer' variant='h5'>Preference: {dataModal.preference.map((style) => {
                                return (
                                    <>
                                        <Typography className='tagsModal' variant='h6'>{style},</Typography>
                                    </>
                                )
                            })}</Typography> */}
                            <Typography variant='h8'>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            </Typography>


                        </Box>
                        {userLocalStorage?._id === image?.userPost
                            &&
                            <Box sx={{ width: '100%', textAlign: 'right', p: 5, mt: 5 }}>
                                <IconButton onClick={handleClickDeleteImg} fontSize='small'>
                                    <DeleteForeverIcon className='iconModal' />
                                </IconButton>
                                <Typography variant='caption' >Eliminar</Typography>

                            </Box>
                        }
                    </Grid>


                </Grid>
            </Modal>
        </div>
    )
}



export default ModalViewImgProfile