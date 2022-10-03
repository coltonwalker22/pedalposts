import React from 'react'
import Post from './Post.js'
import { Grid } from '@mantine/core';

export default function PostList(props){
    const {posts, username} = props

    
    return(
        <Grid className="post-list">
            {posts.map(post => <Post  {...post} key={post._id} username={username}   />)}
        </Grid>
    )
}