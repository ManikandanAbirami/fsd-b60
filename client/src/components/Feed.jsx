import React, { useState, useEffect, useContext } from 'react'
import { Card, Box, CardContent, CardActions, IconButton, TextField, Typography, Container } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import AuthContext from '../context/AuthContext';
import http from '../utils/http';

function Feed() {
    const { user } = useContext(AuthContext);
    console.log(user, "USER FROM CONTEXT API");
    const [posts, setPosts] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        http.get('/post/all').then(res => {
            console.log(res.data, "POSTS FROM API");
            setPosts(res.data);
        })
    }, []);

    // Function to handle like button click
    const handleLike = async (postId) => {
        try {
            const response = await http.put(`/post/like/${postId}`);
            // Update the posts array with the new likes count
            setPosts(posts.map(post =>
                post._id === postId
                    ? { ...post, likes: response.data }
                    : post
            ))
        } catch (err) {
            console.log(err);
        }
    }
    // Function to handle comment button click
    const handleComment = async (postId) => {
        try {
            const response = await http.put(`/post/comment/${postId}`, { text: comment });
            console.log(response.data, "POST - USER");
            setPosts(posts.map(post =>
                post._id === postId
                    ? { ...post, comments: response.data }
                    : post
            ));
            setComment(''); // Clear the comment input field
        } catch (err) {
            console.log(err);
        }
    }

    // Function to handle delete button click
    const handleDelete = async (postId, commentId) => {
        try {
            const response = await http.delete(`/post/comment/${postId}/${commentId}`);
            setPosts(posts.map(post =>
                post._id === postId
                    ? { ...post, comments: response.data }
                    : post
            ));
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom component="h1">Feed</Typography>
            {posts.map(post => (
                <Card key={post._id} sx={{ mt: 2, bgcolor: '#fof8ff' }}>
                    <CardContent>
                        <Typography variant="h6" component="h2">
                            {post.user.username}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {post.date}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {post.content}
                        </Typography>
                        {post.image && <img src={`${post.image}`} alt="Post"
                            style={{ maxWidth: '100%', marginTop: '10px', borderRadius: '8px' }} />}
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" color="textSecondary">
                                {post.likes.length} likes
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {post.comments.length} comments
                            </Typography>
                            {post.comments.map((comment, index) => (
                                <Box key={index} display="flex" alignItems="center" sx={{ mt: 1 }}>
                                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                                        <strong>{comment.username}:</strong> {comment.text}
                                    </Typography>
                                    {comment.user._id === user._id && (
                                        <IconButton size='small' aria-label="delete" onClick={() => handleDelete(post._id, comment._id)} color='secondary'>
                                            <DeleteIcon fontSize='small' />
                                        </IconButton>
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="like" onClick={() => handleLike(post._id)}>
                            {post.likes.includes(user._id) ? (
                                <ThumbUpIcon />
                            ) : (
                                <ThumbUpAltOutlinedIcon />
                            )}
                        </IconButton>
                        <TextField
                            label="Add a comment"
                            variant="outlined"
                            size='small'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            sx={{ ml: 1, flexGrow: 1 }}
                        ></TextField>
                        <IconButton onClick={() => handleComment(post._id)} color='primary'>
                            <CommentIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            ))}
        </Container>
    )
}

export default Feed