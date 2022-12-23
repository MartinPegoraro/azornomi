import React from 'react'
import { useRouter } from 'next/router'
import { useState, useEffect, useCallback } from 'react'
import NavBar from './NavBar'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Box, Typography, Grid, Button, TextField, List, ListItem } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import { io } from "socket.io-client";
import { userApi } from '../pages/api/user';


const socket = io("http://localhost:5000");

export default function InboxMsg() {

    const router = useRouter()
    const [message, setMessage] = useState({ msg: '' })
    const [messages, setMessages] = useState([])
    const [idChat, setIdChat] = useState('')
    const [chat, setChat] = useState({})

    const [userImg, setUserImg] = useState({})
    const [idUserActual, setIdUseractual] = useState('')

    let idOtherUser = router.query
    // console.log(idOtherUser.id);

    const onInputChange = (e) => {
        setMessage(e.target.value);
    }

    const imgUser = router.query.idMsg
    const sendMessage = () => {
        let idActualUser = JSON.parse(localStorage.getItem('user'))
        // console.log(idActualUser.appRole);
        const formMessage = {
            idChat: idChat,
            message: message,
            idUserMsg: idActualUser._id,
            idArtist: idActualUser.appRole === 'artist' ? idActualUser._id : null,
            idCanva: idActualUser.appRole === 'canva' ? idActualUser._id : null,
        }
        // console.log('Enviar mensaje', formMessage)
        socket.emit('newMessage', formMessage)

        setMessage({ msg: '' })
    }

    // const fetchData = async () => {
    //     let idActualUser = JSON.parse(localStorage.getItem('user'))
    //     const otherUser = await userApi.getOneUser(idOtherUser.id)
    //     if (otherUser?.status === 200) {
    //         setUserImg(otherUser.body)
    //     }
    //     setIdUseractual(JSON.parse(localStorage.getItem('user')))
    //     socket.emit("join", idActualUser._id, idOtherUser.id, idActualUser.appRole);

    //     socket.on("messagesSaved", (foundchat, msgInChat) => {
    //         setMessages(msgInChat)
    //         setChat(foundchat)
    //         setIdChat(foundchat._id)

    //     });
    //     socket.on("emitNewMessage", (newMessage) => {
    //         setMessages(arr => [...arr, newMessage]);
    //     });
    //     return () => {
    //         socket.off();
    //     };
    // }
    // useEffect(() => {
    //     fetchData();
    // }, []);

    const founduser = async () => {
        const otherUser = await userApi.getOneUser(idOtherUser.id)
        if (otherUser?.status === 200) {
            setUserImg(otherUser.body)
        }
    }

    useEffect(() => {
        let idActualUser = JSON.parse(localStorage.getItem('user'))
        setIdUseractual(JSON.parse(localStorage.getItem('user')))
        founduser()
        console.log("🚀 ~ file: InboxMsg.js:89 ~ useEffect ~ idOtherUser", idOtherUser)
        // socket.emit("join", idActualUser._id, idOtherUser, idActualUser.appRole);
        socket.emit("join", idActualUser._id, idOtherUser.id, idActualUser.appRole);

        socket.on("messagesSaved", (foundchat, msgInChat) => {
            // console.log('msgInChat', msgInChat, foundchat);
            setMessages(msgInChat)
            setIdChat(foundchat._id)

        });
        socket.on("emitNewMessage", (newMessage) => {
            console.log('Recibido', messages);

            setMessages(arr => [...arr, newMessage]);
            // const pushMsg = messages.push(newMessage)
        });
        return () => {
            socket.off();
        };
    }, [router.query]);
    // console.log(messages, '123');

    // useEffect(() => {
    //     fetchData()
    // }, [fetchData])
    return (
        <>
            <NavBar stateUser='lienzo' />
            {idUserActual?.appRole !== 'artist'
                ?
                <Grid container>
                    <Grid item xs={6.5}>
                        <Box sx={{ margin: 2, p: 1, width: '50%', borderRadius: 3, border: 1, background: 'yellow' }}>
                            <Typography variant='caption'> Recordatorio: Esperar hasta que la otra parte conteste antes de realizar el pago.</Typography>
                        </Box>
                        <Box sx={{ margin: 2, p: 1, width: '70%', borderRadius: 3, border: 1, background: 'rgb(234, 234, 234)' }}>
                            <Typography variant='h5' sx={{ margin: 1 }}>Artista</Typography>
                            <Typography variant='h6' sx={{ margin: 1 }}>Nombre: {userImg?.firstName} {userImg?.lastName}</Typography>
                            <Typography variant='h6' sx={{ margin: 1 }}>NickName: {userImg?.nickName}</Typography>
                            <Typography variant='h6' sx={{ margin: 1 }}>Sexo: {userImg?.genre}</Typography>


                        </Box>
                        <Grid container sx={{ m: 2, mt: 3.5 }}>
                            <Grid item xs={3.5}>
                                <img
                                    className='imgInboxMsg'
                                    src={`https://azoromi-img.s3.sa-east-1.amazonaws.com/imgUpload/${chat?.idImg}.jpg`}
                                    width={210}
                                    height={300}
                                    alt='img'
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <Button className='buttonInboxMsg' sx={{ mb: 5, mt: 6 }} variant='contained' >Transferir</Button>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item xs={5.5} >
                        <Box sx={{ border: 1, m: 2, ml: 20, mr: 10, height: '80vh', borderRadius: 3 }}>
                            <Box sx={{ height: '90%', width: '100%', overflow: 'auto' }}>
                                {messages?.map((msg, index) => {
                                    // console.log(msg);
                                    return (
                                        <>
                                            {idUserActual._id === msg?.idUserMsg ?

                                                <List key={index} sx={{ mt: 1, ml: '50%', width: '45%', maxWidth: 360, border: '0.3px solid black', borderRadius: 3 }}>
                                                    <ListItem >
                                                        <Typography variant='caption' sx={{ color: 'blue' }}>{msg?.message}</Typography>
                                                    </ListItem>
                                                </List>
                                                :
                                                <List key={index + 1} sx={{ mt: 1, ml: 1, width: '45%', maxWidth: 360, bgcolor: 'grey', border: '0.3px solid black', borderRadius: 3 }}>
                                                    <ListItem >
                                                        <Typography variant='caption' sx={{ color: 'red' }}>{msg?.message}</Typography>
                                                    </ListItem>
                                                </List>
                                            }
                                        </>
                                    )
                                })}
                            </Box>
                            <Grid container>
                                <Grid item xs={10} sx={{ mt: 1 }}>
                                    <TextField
                                        onChange={onInputChange}
                                        value={message.msg}
                                        name='msg'
                                        size='small'
                                        sx={{ width: '95%', background: 'rgb(241, 241, 241)', ml: '1%' }}
                                        variant="outlined"
                                        required
                                        id="outlined-required"
                                        placeholder='Escriba un mensaje aqui'
                                    />
                                </Grid>
                                <Grid item xs={2} sx={{ mt: 1 }}>
                                    <Button variant='contained' onClick={sendMessage}>
                                        <SendIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                :
                <Grid container>
                    <Grid item xs={6.5}>
                        <Box sx={{ margin: 2, p: 1, width: '50%', borderRadius: 3, border: 1, background: 'yellow' }}>
                            <Typography variant='caption'> Recordatorio: La transferencia se realizará una vez que el lienzo reciba su diseño terminado.</Typography>
                        </Box>
                        <Box sx={{ margin: 2, p: 1, width: '70%', borderRadius: 3, border: 1, background: 'rgb(244, 244, 244)' }}>
                            <Typography variant='h5' sx={{ margin: 1 }}>Lienzo</Typography>
                            <Typography variant='h6' sx={{ margin: 1 }}>Nombre: {userImg?.firstName} {userImg?.lastName}</Typography>
                            <Typography variant='h6' sx={{ margin: 1 }}>NIckName: {userImg?.nickName}</Typography>
                            <Typography variant='h6' sx={{ margin: 1 }}>Sexo: {userImg?.genre}</Typography>

                        </Box>
                        <Grid container sx={{ m: 2, mt: 3.5 }}>
                            <Grid item xs={3.5}>
                                <img
                                    className='imgInboxMsg'
                                    src={`https://azoromi-img.s3.sa-east-1.amazonaws.com/imgUpload/${chat?.idImg}.jpg`}
                                    width={210}
                                    height={300}
                                    alt='img'
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <Button className='buttonInboxMsg' sx={{ mb: 5, mt: 6 }} variant='contained' >Enviar Diseño</Button>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item xs={5.5} >
                        <Box sx={{ border: 1, m: 2, ml: 20, mr: 10, height: '80vh', borderRadius: 3 }}>
                            <Box sx={{ height: '90%', width: '100%', overflow: 'auto' }}>
                                {messages?.map((msg, index) => {
                                    // console.log(msg);
                                    return (
                                        <>
                                            {idUserActual._id === msg?.idUserMsg ?

                                                <List key={index} sx={{ mt: 1, ml: '50%', width: '45%', maxWidth: 360, border: '0.3px solid black', borderRadius: 3 }}>
                                                    <ListItem >
                                                        <Typography variant='caption' sx={{ color: 'blue' }}>{msg?.message}</Typography>
                                                    </ListItem>
                                                </List>
                                                :
                                                <List key={index + 1} sx={{ mt: 1, ml: 1, width: '45%', maxWidth: 360, bgcolor: 'grey', border: '0.3px solid black', borderRadius: 3 }}>
                                                    <ListItem >
                                                        <Typography variant='caption' sx={{ color: 'red' }}>{msg?.message}</Typography>
                                                    </ListItem>
                                                </List>
                                            }
                                        </>
                                    )
                                })}
                            </Box>
                            <Grid container>
                                <Grid item xs={10} sx={{ mt: 1 }}>
                                    <TextField
                                        onChange={onInputChange}
                                        value={message.msg}
                                        name='msg'
                                        size='small'
                                        sx={{ width: '95%', background: 'rgb(241, 241, 241)', ml: '1%' }}
                                        variant="outlined"
                                        required
                                        id="outlined-required"
                                        placeholder='Escriba un mensaje aqui'
                                    />
                                </Grid>
                                <Grid item xs={2} sx={{ mt: 1 }}>
                                    <Button variant='contained' onClick={sendMessage}>
                                        <SendIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>

                    </Grid>
                </Grid>
            }
        </>


    )
}
