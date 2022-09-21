import React, {useContext, useEffect} from 'react'
import {UserContext} from '../context/UserProvider.js'
import PublicPosts from '../components/PublicPosts.js'



export default function Public() {

const { getAllPosts, allPosts, getAllUsers } = useContext(UserContext)

const postDisplay = allPosts.map(post => {
  return <PublicPosts key={post._id} author={post.user} {...post}/>
})

useEffect(() => {
    getAllPosts();
    getAllUsers();
    // eslint-disable-next-line
}, [allPosts.length])

  return (
    <div className="post-container">{postDisplay}</div>
  )
}
