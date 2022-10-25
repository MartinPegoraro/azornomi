import React from 'react'
import { Button, ImageList, ImageListItem, IconButton, ImageListItemBar, Box, List } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useState, useEffect } from 'react'
import Modal from './ModalInfoArtist';
import axios from 'axios';


export default function Artist() {
    const [dummyData, setDummyData] = useState([])
    const [dataModal, setDataModal] = useState({ artistId: '', artistName: '', artistLastName: '', artistStyle: [], img: '' })
    const [open, setOpen] = useState(false);

    const handleOpen = (artist, img) => {
        setDataModal({ ...artist, img: img })
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const fetchData = async () => {
        const res = await axios.get('/api/dummyData') // Se vuelve a traer todos los datosControlador
        const data = await res.data
        setDummyData(data)
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            <Modal handleClose={handleClose}
                open={open}
                dataModal={dataModal} />
            <Box className='gridContainer'>
                {dummyData.map((art) => {
                    return (
                        <List key={art.artistId}>
                            {
                                art.artistImg.map((img) => {
                                    return (
                                        <Button className='buttonImg' key={img.title} onClick={() => handleOpen(art, img.img)}>
                                            <ImageListItem >
                                                <img className='imgHome'
                                                    // src={img.img}
                                                    src={`${img.img}?w=248&fit=crop&auto=format`}
                                                    srcSet={`${img.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                                    width={300}
                                                    height={300}
                                                    alt='img'
                                                />
                                                <ImageListItemBar
                                                    className='infoImg'
                                                    title={img.title}
                                                    subtitle={art.artistName + art.artistLastName}
                                                    actionIcon={
                                                        <IconButton
                                                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                            aria-label={`info about ${img.title}`}
                                                        >
                                                            <InfoIcon />
                                                        </IconButton>
                                                    }
                                                />
                                            </ImageListItem>
                                        </Button>
                                    )
                                })
                            }
                        </List >
                    )
                })}
            </Box>
        </div>
    )
}
