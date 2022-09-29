import React, { useState } from 'react'
import Link from 'next/link'
import { Box, Grid, Button, Avatar, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import { deepOrange, deepPurple } from '@mui/material/colors';
import useStatesHome from '../hook/useStatesHome';

export default function NavBar({ stateUser }) {
    const [state, setState] = useState('')

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
                            <Button className='buttonNavBarTatuador' value='artista' onClick={handleClick} variant="outlined"  > Diseñar</Button>
                        </Link>
                        : state === 'lienzo' || stateUser === 'lienzo' ?
                            < Link href='/homeArtist'>
                                <Button className='buttonNavBarLienzo' value='lienzo' onClick={handleClick} variant="outlined"  > Encontrar</Button>
                            </Link>
                            : null
                    }
                </Grid>
                <Grid item xs={7} sx={{ position: 'relative' }}>
                    <Button className='search' >
                        <SearchIcon />
                        Buscar...
                    </Button>
                </Grid>
                <Grid item xs={0.5} sx={{ position: 'relative' }}>
                    <IconButton sx={{ p: 0 }} className='iconButton' size='medium'>
                        < HelpIcon sx={{ fontSize: 30 }} />
                    </IconButton>
                </Grid>
                <Grid item xs={0.5} sx={{ position: 'relative' }}>
                    <IconButton sx={{ p: 0 }} className='iconButton' size='medium'>
                        < NotificationsIcon sx={{ fontSize: 30 }} />
                    </IconButton>
                </Grid>
                <Grid item xs={0.5} sx={{ position: 'relative' }}>
                    <IconButton sx={{ p: 0 }} className='iconButton' size='medium'>
                        < ChatIcon sx={{ fontSize: 30 }} />
                    </IconButton>
                </Grid>
                <Grid item xs={0.5} sx={{ position: 'relative' }} >
                    <IconButton sx={{ p: 0 }} className='iconButton' size='medium'>
                        < AccountCircleIcon sx={{ fontSize: 30 }} />
                    </IconButton>
                </Grid>

            </Grid>
        </Box >
    )
}

