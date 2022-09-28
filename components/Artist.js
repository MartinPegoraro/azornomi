import React from 'react'
import { Button, ImageList, ImageListItem, IconButton, ImageListItemBar, Box, List } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useState, useEffect } from 'react'

export default function Artist() {
    const [dummyData, setDummyData] = useState([])

    const fetchData = async () => {
        const res = await fetch('/api/dummyData') // Se vuelve a traer todos los datosControlador
        const data = await res.json()
        var newData = data
        setDummyData(newData)
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>

            <Box className='gridContainer'>
                {dummyData.map((art) => {
                    return (
                        <List key={art.artistId}>
                            {
                                art.artistImg.map((img) => {
                                    // console.log(img);
                                    return (
                                        <Button className='buttonImg' key={img.title}>
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