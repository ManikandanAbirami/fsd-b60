import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import { Paper, Typography, Avatar, Button } from '@mui/material'

function Profile() {
    const { user, logout } = useContext(AuthContext);
    return (
        <Paper style={{ padding: '20px' }}>
            <Avatar src={user.profilePicture} alt={user.username} style={{ width: '100px', height: '100px', margin: '0 auto' }} />
            <Typography variant="h6">{user.username}</Typography>
            <Typography variant="body1">{user.email}</Typography>
            <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
        </Paper>
    )
}

export default Profile