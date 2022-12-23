import React from 'react'
import { Button, ImageList, ImageListItem, TextField, IconButton, ImageListItemBar, Box, List, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useState, useEffect } from 'react'
import Modal from './ModalInfoArtist';
import axios from 'axios';
import { userApi } from '../pages/api/user';
import { useRouter } from 'next/router'


export default function Search() {
    const [dataModal, setDataModal] = useState({})
    const [user, setUser] = useState()
    const [open, setOpen] = useState(false);
    const [searchedUsers, setSearchedUsers] = useState()
    const [userLocalStorage, setUserLocalStorage] = useState()
    const [publicationSave, setPublicationSave] = useState()

    const router = useRouter()

    const handleOpen = async (image) => {
        console.log('click', image);
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
        const search = router.query.search

        const wordsArray = search?.split(' ')

        setUserLocalStorage(JSON.parse(localStorage.getItem('user')))
        const res = await Promise.all([
            userApi.getAllCanvaData(),
            userApi.getAllArtistData()
        ])
        const users = [...res[0]?.data.body, ...res[1]?.data.body]
        const dataUser = users.filter((user) => {
            for (let index = 0; index < wordsArray?.length; index++) {
                const word = wordsArray[index].toLowerCase();
                if (user?.firstName?.toLowerCase().includes(word)) return true
                if (user?.lastName?.toLowerCase().includes(word)) return true
                if (user?.nickName?.toLowerCase().includes(word)) return true
            }
        })
        const foundSearch = await dataUser.map((image) => {
            return image.imagesWork
        })

        setSearchedUsers(foundSearch)
    }

    useEffect(() => {
        fetchData();
    }, [router.query.search])

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

                {searchedUsers?.map((user) => {
                    return (
                        <>
                            {user?.map((image) => {
                                console.log("🚀 ~ file: Search.js:83 ~ user?.map ~ image", image.imageId)
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
                        </>
                    )

                })}
            </Box>
        </div>
    )
}