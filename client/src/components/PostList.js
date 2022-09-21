import React from 'react'
import Post from './Post.js'

export default function PostList(props){
    const {posts, username} = props
        // console.log("posts",posts)
    
    return(
        <div className="post-list">
            {posts.map(post => <Post {...post} key={post._id} username={username}   />)}
        </div>
    )
}