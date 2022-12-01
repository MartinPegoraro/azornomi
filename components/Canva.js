import React from 'react'
import { Button, ImageList, ImageListItem, IconButton, ImageListItemBar, Box, List } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useState, useEffect } from 'react'
import Modal from './ModalInfoCanva';
import axios from 'axios';
import { userApi } from '../pages/api/user';

export default function Canva() {
    const [open, setOpen] = useState(false);
    const [dummyData, setDummyData] = useState([])
    const [imgCanvas, setImgCanvas] = useState([])

    // const [dataModal, setDataModal] = useState({ lienzoId: '', lienzoName: '', lienzoLastName: '', preference: [], img: '' })
    const [dataModal, setDataModal] = useState()
    const [user, setUser] = useState()


    const handleOpen = async (image) => {
        const resCanva = await userApi.getOneCanva(image.userPost)
        setUser(resCanva?.data.body)
        setDataModal(image)
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    const fetchData = async () => {
        const res = await userApi.getAllCanva()
        setImgCanvas(res?.data.body)
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            <Modal
                handleClose={handleClose}
                open={open}
                dataModal={dataModal}
                user={user}
            />
            <Box className='gridContainer'>
                {imgCanvas?.map((image) => {
                    return (
                        <List key={image._id}>
                            <Button className='buttonImg' onClick={() => handleOpen(image)}>
                                <ImageListItem >
                                    <img className='imgHome'
                                        src={`https://azoromi-img.s3.sa-east-1.amazonaws.com/imgUpload/${image.imageId}.jpg`}
                                        // src={`${img.img}?w=248&fit=crop&auto=format`}
                                        // srcSet={`${img.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        width={300}
                                        height={300}
                                        alt='img'
                                    />
                                    <ImageListItemBar
                                        className='infoImg'
                                        title={image.description}
                                    />
                                </ImageListItem>
                            </Button>

                        </List >
                    )
                })}
            </Box>
        </div>
    )
}