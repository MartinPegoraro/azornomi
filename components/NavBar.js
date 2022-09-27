import React from 'react'
import { Box, Grid, Button, Avatar, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import { deepOrange, deepPurple } from '@mui/material/colors';

export default function NavBar() {
    return (
        <Box className='boxHome'>
            <Grid container >
                <Grid item xs={0.5} sx={{ position: 'relative' }}>
                    <IconButton className='iconButton' size='medium'>
                        <Avatar
                            alt="AzorÑomi"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 25, height: 25, bgcolor: deepOrange[500] }}
                        />
                    </IconButton>
                </Grid>
                <Grid item xs={2.5} sx={{ position: 'relative' }}>
                    <Button className='buttonNavBar' variant="outlined"  > Diseñar
                    </Button>
                </Grid>
                <Grid item xs={7} sx={{ position: 'relative' }}>
                    <Button className='search' >
                        <SearchIcon />
                        Buscar
                    </Button>
                </Grid>
                <Grid item xs={0.5} sx={{ position: 'relative' }}>
                    <IconButton sx={{ p: 0 }} className='iconButton' size='medium'>
                        < HelpIcon sx={{ fontSize: 30, color: deepOrange[500] }} />
                    </IconButton>
                </Grid>
                <Grid item xs={0.5} sx={{ position: 'relative' }}>
                    <IconButton sx={{ p: 0 }} className='iconButton' size='medium'>
                        < NotificationsIcon sx={{ fontSize: 30, color: deepOrange[500] }} />
                    </IconButton>
                </Grid>
                <Grid item xs={0.5} sx={{ position: 'relative' }}>
                    <IconButton sx={{ p: 0 }} className='iconButton' size='medium'>
                        < ChatIcon sx={{ fontSize: 30, color: deepOrange[500] }} />
                    </IconButton>
                </Grid>
                <Grid item xs={0.5} sx={{ position: 'relative' }} >
                    <IconButton sx={{ p: 0 }} className='iconButton' size='medium'>
                        < AccountCircleIcon sx={{ fontSize: 30, color: deepOrange[500] }} />
                    </IconButton>
                </Grid>

            </Grid>
        </Box>
    )
}

