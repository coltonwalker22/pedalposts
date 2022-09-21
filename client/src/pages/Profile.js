import React, { useContext, useEffect} from 'react'
import PostForm from '../components/PostForm.js'
import PostList from '../components/PostList.js'

import { UserContext } from '../context/UserProvider.js'

export default function Profile() {

  const { user: { username }, addPost, posts, getUserPosts} = useContext(UserContext)

  console.log(posts)

useEffect(() => {
  getUserPosts();
}, [])



  return (
    <div className="profile">
        <h1>Welcome @{username}!</h1>
        <h3 className="issue-title">Add A Post</h3>
        <p>Post a new pedal, pedal combination, or a pedal settings that
           you wish to share with the community. Be sure to be descriptive!
           When you add your post, your own posts will display below and on
           the public page for all to see.
        </p>
        <PostForm addPost={addPost}/>
        <h3 className="pedal-post-title">Your Pedal Posts</h3>
        <PostList posts={posts} username={username} /> 
    </div>
  )
}