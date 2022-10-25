import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import NavBar from './NavBar'
import { Grid, IconButton, Typography, ImageListItem, Button, Box, Avatar } from '@mui/material'
import { useRouter } from 'next/router'

export default function Inbox() {
    const router = useRouter()
    const [dummyData, setDummyData] = useState({})
    const stateUser = 'lienzo'

    const fetchData = useCallback(async () => {
        const resArtist = await axios.get('/api/dummyData')
        const dataArtisti = await resArtist.data
        setDummyData(dataArtisti[0])
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <>
            <NavBar stateUser={stateUser} />
            <Grid container >

                <Grid item xs={6} sx={{ height: '90vh', position: 'relative' }}>
                    <Box sx={{ textAlign: 'center', ml: 10, mt: 2, width: '70%', border: 1, height: '80vh', position: 'absolute', borderRadius: 5, display: 'table', background: 'rgb(234, 234, 234)' }}>
                        {
                            dummyData?.chatLienzo?.map((chat) => {
                                console.log(typeof (chat.idLienzo));
                                return (
                                    <>
                                        {chat.idLienzo === undefined
                                            ?
                                            <Typography variant='h4' sx={{ color: 'rgb(112, 112, 112)', p: 10, display: 'table-cell', verticalAlign: 'middle' }}>Los chats de los diseños que esten pendientes a terminar  iran a este buzón. </Typography>

                                            :
                                            chat.state === 'process'
                                                ?
                                                <Button key={chat.id} variant='contained' color='error' sx={{ color: 'black', m: '0 auto', mt: 2, mb: 3, width: '60%', border: 1, borderRadius: 5, background: 'rgb(255, 133, 133)' }}>
                                                    <Typography variant='h7' sx={{ textTransform: 'capitalize' }}>{chat.name}</Typography>
                                                </Button>
                                                : null
                                        }
                                    </>
                                )
                            })
                        }
                    </Box>
                </Grid>
                <Grid item xs={6} sx={{ height: '90vh', position: 'relative' }}>
                    <Box sx={{ textAlign: 'center', ml: 10, mt: 2, width: '70%', border: 1, height: '80vh', position: 'absolute', borderRadius: 5, display: 'table', background: 'rgb(234, 234, 234)' }} >

                        {
                            dummyData?.chatLienzo?.map((chat) => {
                                console.log(typeof (chat.idLienzo));
                                return (
                                    <>
                                        {chat.idLienzo === undefined
                                            ?
                                            <Typography variant='h4' sx={{ color: 'rgb(112, 112, 112)', p: 10, display: 'table-cell', verticalAlign: 'middle' }}>Luego de que los diseños esten completos, los chats correspondientes a esos diseños iran en este buzón. </Typography>
                                            :
                                            chat.state === 'ending'
                                                ?
                                                <Button key={chat.id} variant='contained' color='success' sx={{ color: 'black', m: '0 auto', mt: 2, mb: 3, width: '60%', border: 1, borderRadius: 5, background: 'rgb(88, 255, 138)' }}>
                                                    <Typography variant='h7' sx={{ textTransform: 'capitalize' }}>{chat.name}</Typography>
                                                </Button>
                                                : null
                                        }
                                    </>
                                )
                            })
                        }

                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
