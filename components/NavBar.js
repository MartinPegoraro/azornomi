import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Box, Grid, Button, Avatar, IconButton, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import { deepOrange, deepPurple } from '@mui/material/colors';
import useStatesHome from '../hook/useStatesHome';
import { userApi } from '../pages/api/user';
import { useRouter } from 'next/router'


export default function NavBar({ stateUser }) {
    const [state, setState] = useState('')
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState({ search: '' })

    const router = useRouter()

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [])

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setMessage({
            ...message,
            [name]: value
        });
    }

    const handleClickSend = async () => {
        router.push({ pathname: '/search', query: { search: message.search } })
    }

    const handleClick = (e) => {
        if (e.target.value === 'lienzo') {
            setState('artista')

        } else {
            setState('lienzo')
        }
    }
    return (
        <Box className='boxHome'>
            <Grid container >
                <Grid item xs={0.5} sx={{ position: 'relative' }}>
                    <IconButton className='iconButton' size='medium'>
                        <Avatar
                            alt="AzorÑomi"
                            src="/azorñomi.png"
                            sx={{ width: 35, height: 35 }}
                        />
                    </IconButton>
                </Grid>
                <Grid item xs={2.5} sx={{ position: 'relative' }}>
                    {state === 'artista' || stateUser === 'artista'
                        ?
                        <Link href='/homeCanvas'>
                            <Button className='buttonNavBarTatuador' value='artista' onClick={handleClick} variant="outlined" > Encontrar</Button>
                        </Link>
                        : state === 'lienzo' || stateUser === 'lienzo' ?
                            < Link href='/homeArtist'>
                                <Button className='buttonNavBarLienzo' value='lienzo' onClick={handleClick} variant="outlined"  > Diseñar</Button>
                            </Link>
                            : null
                    }
                </Grid>
                <Grid item xs={7} sx={{ position: 'relative' }}>
                    <TextField
                        name='search'
                        value={message.search}
                        onChange={onInputChange}
                        className='search'
                        size='small'
                        placeholder='Buscar '
                    />

                </Grid>
                <Grid item xs={1} sx={{ position: 'relative' }}>
                    <IconButton sx={{ border: '1px solid rgb(55, 54, 54)' }} onClick={handleClickSend}>
                        <SearchIcon />
                    </IconButton>

                </Grid>
                {/* <Grid item xs={0.5} sx={{ position: 'relative' }}>
                    <IconButton sx={{ p: 0 }} className='iconButton' size='medium'>
                        < HelpIcon sx={{ fontSize: 30 }} />
                    </IconButton>
                </Grid>
                <Grid item xs={0.5} sx={{ position: 'relative' }}>
                    <IconButton sx={{ p: 0 }} className='iconButton' size='medium'>
                        < NotificationsIcon sx={{ fontSize: 30 }} />
                    </IconButton>
                </Grid> */}
                <Grid item xs={0.5} sx={{ position: 'relative' }}>
                    <Link href={{ pathname: `/profile/${user?._id}/inbox` }}>
                        <a>
                            <IconButton sx={{ p: 0 }} className='iconButton' size='medium'>
                                < ChatIcon sx={{ fontSize: 30 }} />
                            </IconButton>

                        </a>
                    </Link>
                </Grid>
                <Grid item xs={0.5} sx={{ position: 'relative' }} >
                    <Link href={{ pathname: `/profile/${user?._id}` }} >
                        <IconButton sx={{ p: 0 }} className='iconButton' size='medium'>
                            < AccountCircleIcon sx={{ fontSize: 30 }} />
                        </IconButton>
                    </Link>
                </Grid>

            </Grid>
        </Box >
    )
}

