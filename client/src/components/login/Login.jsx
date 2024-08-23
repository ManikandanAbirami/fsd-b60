import React, { useContext, useState } from 'react'
import { Button, TextField, Typography, Container } from '@mui/material'
import AuthContext from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/feed');
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Container maxWidth="xs">
            <Typography variant="h4" component="h1" align="center" gutterBottom> Login </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                </TextField>
                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}>
                </TextField>
                <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
            </form>
        </Container>
    )
}

export default Login