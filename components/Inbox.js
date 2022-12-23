import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import NavBar from './NavBar'
import { Grid, IconButton, Typography, ImageListItem, Button, Box, Avatar } from '@mui/material'
import { useRouter } from 'next/router'
import { userApi } from '../pages/api/user'
import Link from 'next/link';


export default function Inbox() {
    const router = useRouter()
    const [dummyData, setDummyData] = useState({})
    const [chats, setChats] = useState([])
    const [userChat, setUserChat] = useState({})
    const [userLocalStorage, setUserLocalStorage] = useState()

    const stateUser = 'lienzo'

    let idImg = Date.now()

    const fetchData = useCallback(async () => {
        const userQuery = router.query.id;
        setUserLocalStorage(JSON.parse(localStorage.getItem('user')))
        const resUser = await userApi.getOneUser(userQuery)
        if (resUser?.status === 200) {
            setUserChat(resUser.body)
            if (resUser?.body?.appRole === 'canva') {
                const res = await userApi.getChatCanva(userQuery)
                if (res?.data?.status === 200) {
                    const chatsUser = res?.data?.body.filter((chat) => {
                        return chat.idArtist !== null
                    })
                    setChats(chatsUser)
                }
            } else {
                const res = await userApi.getChatArtist(userQuery)
                if (res?.data?.status === 200) {
                    const chatsUser = res?.data?.body.filter((chat) => {
                        return chat.idCanva !== null
                    })
                    setChats(chatsUser)
                }
            }
        }

    }, [router])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    // console.log(chats);
    return (
        <>
            <NavBar stateUser={stateUser} />
            <Grid container >
                {chats[0]?.idCanva === userLocalStorage?._id
                    ?
                    <>
                        <Grid item xs={3} ></Grid>
                        <Grid item xs={6} sx={{ height: '90vh', position: 'relative' }}>
                            <Box sx={{ textAlign: 'center', ml: 10, mt: 2, width: '70%', border: 1, height: '80vh', position: 'absolute', borderRadius: 5, display: 'table', background: 'rgb(234, 234, 234)' }}>
                                {
                                    chats?.map((chat) => {
                                        // console.log("🚀 ~ file: Inbox.js:55 ~ chats?.map ~ chat", chat.idArtist)
                                        return (
                                            <>
                                                {chat.idArtist === null
                                                    ?
                                                    <Typography variant='h4' sx={{ color: 'rgb(112, 112, 112)', p: 10, display: 'table-cell', verticalAlign: 'middle' }}>Los chats de los diseños que esten pendientes a terminar  iran a este buzón. </Typography>

                                                    :
                                                    <Link href={{
                                                        pathname: `/profile/[id]/inbox/[idMsg]`,
                                                        query: { id: chat.idArtist._id, idMsg: idImg }
                                                    }} ><a>
                                                            <Button key={chat._id} variant='contained' color='error' sx={{ textAlign: 'center', color: 'black', m: '0 auto', mt: 2, mb: 3, width: '60%', border: 1, borderRadius: 5, background: 'rgb(255, 133, 133)' }}>
                                                                <Typography variant='h7' sx={{ textTransform: 'capitalize' }}>{chat.idArtist.nickName}</Typography>
                                                            </Button>
                                                        </a>
                                                    </Link>
                                                }
                                            </>
                                        )
                                    })
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={3} ></Grid>
                    </>
                    :
                    <>
                        <Grid item xs={3} ></Grid>
                        <Grid item xs={6} sx={{ height: '90vh', position: 'relative' }}>
                            <Box sx={{ textAlign: 'center', ml: 10, mt: 2, width: '70%', border: 1, height: '80vh', position: 'absolute', borderRadius: 5, display: 'table', background: 'rgb(234, 234, 234)' }}>
                                {
                                    chats?.map((chat) => {
                                        // console.log("🚀 ~ file: Inbox.js:55 ~ chats?.map ~ chat", chat.idCanva)
                                        return (
                                            <>
                                                {chat.idCanva === null
                                                    ?
                                                    <Typography variant='h4' sx={{ color: 'rgb(112, 112, 112)', p: 10, display: 'table-cell', verticalAlign: 'middle' }}>Los chats de los diseños que esten pendientes a terminar  iran a este buzón. </Typography>

                                                    :
                                                    <Link href={{
                                                        pathname: `/profile/${chat.idCanva._id}/inbox/[idMsg]`,
                                                        query: { idMsg: idImg }
                                                    }} ><a>
                                                            <Button key={chat._id} variant='contained' color='error' sx={{ textAlign: 'center', color: 'black', m: '0 auto', mt: 2, mb: 3, width: '60%', border: 1, borderRadius: 5, background: 'rgb(255, 133, 133)' }}>
                                                                <Typography variant='h7' sx={{ textTransform: 'capitalize' }}>{chat.idCanva.nickName}</Typography>
                                                            </Button>
                                                        </a>
                                                    </Link>
                                                }
                                            </>
                                        )
                                    })
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={3} ></Grid>
                    </>
                }
                {/* <Grid item xs={6} sx={{ height: '90vh', position: 'relative' }}>
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
                </Grid> */}
            </Grid>
        </>
    )
}
