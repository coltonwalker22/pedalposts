import React, {useState, useContext, useEffect} from 'react'
import {UserContext} from '../context/UserProvider.js'


export default function Post(props) {
    const { user, title, imgUrl, description, datePosted, _id, username } = props

    const { userAxios, getUserPosts } = useContext(UserContext)


    const [showComments, setShowComments] = useState(false)
    const [inputs, setInputs] = useState({ comment: "" })
    const [postComments, setPostComments] = useState([])

    function newGetComments(postId) {
        userAxios.get(`api/pedalpost/comments/${postId}/comments`)
            .then(res => setPostComments(res.data))
            .catch(err => console.log(err.response.data.errMsg))
    }

    function addPostComment(postId, newComment) {
        userAxios.post(`api/pedalpost/comments/${postId}/comments`, newComment)
            .then(res => setPostComments(prevState => [...prevState, res.data]))
            .catch(err => console.log(err.response.data.errMsg))
    }

    useEffect(() => {
        newGetComments(_id)
        getUserPosts(_id)
          // eslint-disable-next-line
    }, [])

    function onChange(e){
        const { name, value } = e.target
        setInputs(prevState => ({ ...prevState, [name]: value}))
    }

    function submission(e){
        e.preventDefault()
        addPostComment(_id, inputs)
    }


    return(
     <div className="post">
        <h1>{title}</h1>
        <div><img className="post-img" src={imgUrl}></img></div>
        <p>{description}</p>
        <h3>{new Date(datePosted).toLocaleDateString()}</h3>
        <div>
            {postComments.map(comment => <div>{comment.comment}</div>)}
        </div> 
        <form onSubmit={submission}>
            <input 
            onChange={onChange}
            name="comment"
            type="text"
            value={inputs.comment}
            placeholder="Enter comment here..."/>
            <button>Submit</button>
        </form> 
 </div>
        )
}