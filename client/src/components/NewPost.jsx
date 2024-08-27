import React, { useState, useContext } from 'react'
import { Button, TextField, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import http from '../utils/http'

function NewPost() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }

        try {
            await http.post('/post/create', formData);
            // Redirect to the home page after successful post creation
            navigate('/feed');
        } catch (error) {
            console.error('Failed to create post:', error);
        }
    }
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" align="center" gutterBottom>Create a Post</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Content"
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <input type="file" onChange={(e) => setImage(e.target.files[0])} accept='image/*' />
                <Button type='submit' variant='contained' color='primary'>Create Post</Button>
            </form>
        </Container>
    )
}

export default NewPost