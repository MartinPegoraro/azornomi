import React from 'react'
import { Button, ImageList, ImageListItem, IconButton, ImageListItemBar, Box, List } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useState, useEffect } from 'react'
import Modal from './ModalInfoCanva';
import axios from 'axios';

export default function Canva() {
    const [open, setOpen] = useState(false);
    const [dummyData, setDummyData] = useState([])
    const [dataModal, setDataModal] = useState({ lienzoId: '', lienzoName: '', lienzoLastName: '', preference: [], img: '' })


    const handleOpen = (lienzo, img) => {
        setDataModal({ ...lienzo, img: img })
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    const fetchData = async () => {
        const res = await axios.get('/api/dummyDataLienzo') // Se vuelve a traer todos los datosControlador
        console.log(res.data, 'res');
        const data = await res.data
        setDummyData(data)
    }

    useEffect(() => {
        fetchData();
    }, [])

    console.log(dummyData);
    return (
        <div>
            <Modal handleClose={handleClose}
                open={open}
                dataModal={dataModal} />
            <Box className='gridContainer'>
                {dummyData.map((lienzo) => {
                    return (
                        <List key={lienzo.lienzoId}>
                            {
                                lienzo.lienzoImg.map((img) => {
                                    return (
                                        <Button className='buttonImg' key={img.img} onClick={() => handleOpen(lienzo, img.img)}>
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
                                                    subtitle={lienzo.lienzoName + lienzo.lienzoLastName}
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