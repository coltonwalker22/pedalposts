import React, { useContext, useEffect} from 'react'
import PostForm from '../components/PostForm.js'
import PostList from '../components/PostList.js'

import { UserContext } from '../context/UserProvider.js'
import {Button, Text } from '@mantine/core';

export default function Profile() {

  const { user: { username }, addPost, posts, getUserPosts} = useContext(UserContext)

  console.log(posts)

useEffect(() => {
  getUserPosts();
}, [])



  return (
  <>
    <div className="profile">
        <h1>Welcome {username}!</h1>
        <h3 className="issue-title">Add A Post</h3>
        <Text
        style={{marginBottom: 20, width: 320}}
        size="xl"
        >Post a new pedal, pedal combination, or a pedal settings that
           you wish to share with the community. Be sure to be descriptive!
           When you add your post, your own posts will display below and on
           the public page for all to see.
        </Text>
        <PostForm addPost={addPost}/>
    </div>
        <h3 className="pedal-post-title">Your Pedal Posts</h3>
        <PostList style={{justify: 'center'}} posts={posts} username={username} /> 
  </>
  )
}