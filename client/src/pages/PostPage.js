import React, {useEffect, useState, useContext} from 'react'
import { UserContext } from '../context/UserProvider.js'
import {useParams} from 'react-router-dom'
import Comment from '../components/Comment.js'


export default function PostPage(props) {

    let params = useParams();
    let post_id = useParams();
    let {id} = useParams();
    let postId = id.slice(1)

    const { userAxios, getUserPosts, user, posts} = useContext(UserContext)
    
    const [allUsers, setAllUsers] = useState([])

    const [post, setPost] = useState([])

    const [postComments, setPostComments] = useState([])


    const initInputs = { comment: ""}

    const editInputs = { editComment: ""}

    const [editInput, setEditInput] = useState({editInputs})

    const [inputs, setInputs] = useState({initInputs})


    function getAllUsers(){
        userAxios.get('/api/user')
        .then(res => setAllUsers(res.data))
        .catch(err => console.log(err.response.data.errMsg))
    }



    function newGetComments() {
        userAxios.get(`/api/pedalpost/comments/${postId}/comments`)
            .then(res => setPostComments(res.data))
            .catch(err => console.log(err.response.data.errMsg))
    }

    function addComment(postId, newComment){
        userAxios.post(`/api/pedalpost/comments/${postId}/comments`, newComment)
            .then(res => setPostComments(prevState => [...prevState, res.data]))
            .catch(err => console.log(err.response.data.errMsg))
    }



    function updateComment(postId, commentId, newEditComment){
        console.log("udpate comment called with this ocmment: ", newEditComment)
        userAxios.put(`/api/pedalpost/comments/${postId}/comments/${commentId}`, {comment: newEditComment})
            .then(res =>{ 
                console.log("response from updateComment: ", res.data)
                setPostComments(prevList => prevList.map(update => (update._id === commentId ?
                    {...update, comment: res.data.comment} : update)))
            })
            .catch(err => console.log(err))
    }




    
    function getPost(){
        userAxios.get(`/api/pedalpost/${postId}`)
        .then((res) => setPost(res.data))     
        .catch(err => console.log(err.response.data.errMsg))
    }

    function onChange(e) {
        e.preventDefault();
        const {name, value} = e.target
        setInputs(prevState => ({...prevState, [name]: value}))
    }
    
    function submitComment(e){
        e.preventDefault();
        addComment(post._id, inputs);
        setInputs({ comment: ""});
    }


    console.log("comments", postComments)


    useEffect(() =>{
     getPost()
     newGetComments(postId)
     getAllUsers()
     getUserPosts(postId)
    },[])

console.log("allUsers", allUsers)
console.log("post.user", post.user)
console.log("post", post)
console.log("posts", posts)

console.log("editcomment:", editInput.editComment)

  return (
    <div className="postpage-background">
        <div className="postpage-container">
            <h1 className="postpage-title">{post.title}</h1>
            <p> posted by: {post.user?.username}</p>
            <h3 className="postpage-date"> posted on {new Date(post.datePosted).toLocaleDateString()}</h3>
            <div><img className="postpage-img" src={post.imgUrl}></img></div>
            <p className="postpage-description">{post.description}</p>
                {postComments.map(comment => <Comment key={comment._id} comment={comment} newGetComments={newGetComments} allUsers={allUsers} post={post} updateComment={updateComment} user={user} />)}        
            <div className="postpage-form-section">
                <form onSubmit={submitComment}>
                    <textarea
                    type="text"
                    name="comment"
                    onChange={onChange}
                    value={inputs.comment}
                    placeholder="add Comment"
                    className="postpage-add-comment"
                    />
                    <button>send</button>
                </form>
            </div>
        </div>
    </div>

  )
}
