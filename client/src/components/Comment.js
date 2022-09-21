import React, {useContext, useState} from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserProvider.js'

export default function Comment(props) {
    const {comment, user, newGetComments, allUsers, post, updateComment} = props

    const [editMode, setEditMode] = useState(false)
 
    const { userAxios} = useContext(UserContext)

    const editInputs = { editComment: comment.comment}

    const [editInput, setEditInput] = useState(editInputs)

    function onChange(e) {
        e.preventDefault();
        const {name, value} = e.target
        setEditInput(prevState => ({...prevState, [name]: value}))
    }

  return (
  <>
    <div className="postpage-comment">
                        <small className='postpage-comment-user'>{allUsers.find(u => u._id === comment.user)?.username}</small>
                        <p>{comment.comment}</p>
                        <h4 className="comment-date"> commented on {new Date(post.datePosted).toLocaleDateString()}</h4>
                        {user._id === comment.user &&
                        <span className="delete-button"onClick={()=>setEditMode(prev => !prev)}>{editMode ? "Cancel Edit" : "Edit Comment"}</span>}
                        {user._id === comment.user &&
                        <span className="delete-button"onClick={()=> {                       
                                    userAxios.delete(`/api/pedalpost/comments/${post._id}/comments/${comment._id}`)
                                    .then(res => {
                                        newGetComments(post._id)
                                        alert(`Successfully deleted the comment`)
                                    })
                                    .catch(err => console.log(err))                  
                        }}>Delete Comment</span>}
                        {editMode && user._id === comment.user &&
                        <div>
                            <input
                            name="editComment"
                            onChange={onChange}
                            value={editInput.editComment}
                            
                            />
                            <button onClick={()=>{updateComment(post._id, comment._id, editInput.editComment)
                            setEditMode(false)
                            }}>submit</button>
                        </div>
                        }
    </div>
  
  </>
  )
}
