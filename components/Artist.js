import React from 'react'
import { Button, ImageList, ImageListItem, IconButton, ImageListItemBar, Box, List } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useState, useEffect } from 'react'
import Modal from './ModalInfoArtist';
import axios from 'axios';
import { userApi } from '../pages/api/user';


export default function Artist() {
    const [dataModal, setDataModal] = useState({ artistId: '', artistName: '', artistLastName: '', artistStyle: [], img: '' })
    const [open, setOpen] = useState(false);
    const [imgArtist, setImgArtist] = useState([])
    const [user, setUser] = useState()
    const [userLocalStorage, setUserLocalStorage] = useState()
    const [publicationSave, setPublicationSave] = useState()

    const handleOpen = async (image) => {
        const resArtist = await userApi.getOneArtist(image.userPost)
        if (resArtist?.data.status === 200) {
            const formData = {
                idImage: image?._id,
                idUserSaveImg: userLocalStorage?._id,
                idUserCreateImg: resArtist.data.body?._id,
                imageId: image?.imageId
            }

            const foundSaveImg = await userApi.createSaveImg(formData)
            if (foundSaveImg?.data.status === 200) {
                setPublicationSave(foundSaveImg?.data.body)
            }
        }
        setUser(resArtist?.data.body)
        setDataModal(image)
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const fetchData = async () => {
        setUserLocalStorage(JSON.parse(localStorage.getItem('user')))
        const res = await userApi.getAllArtist()
        setImgArtist(res?.data.body)
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
                publicationSave={publicationSave}
            />
            <Box className='gridContainer'>
                {imgArtist?.map((image) => {
                    return (
                        <List key={image._id}>
                            <Button className='buttonImg' onClick={() => handleOpen(image)}>
                                <ImageListItem >
                                    <img className='imgHome'
                                        src={`https://azoromi-img.s3.sa-east-1.amazonaws.com/imgUpload/${image.imageId}.jpg`}
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
