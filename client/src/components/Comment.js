import React, {useContext, useState} from 'react'
import { UserContext } from '../context/UserProvider.js'
import {Card, Button, Input,  UnstyledButton, Avatar, Group} from '@mantine/core';
import { IconTrash } from '@tabler/icons';


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
    <Card shadow="sm" radius="md" withBorder className="comment-card">
      <Group position="apart">
                        <h1 className='postpage-comment-user'>{allUsers.find(u => u._id === comment.user)?.username}</h1>
    {user._id === comment.user &&
                        < UnstyledButton
                        
                        style={{marginBottom: 30}}
                        variant="gradient" gradient={{ from: 'orange', to: 'red' }}                          
                        onClick={()=> {                       
                                    userAxios.delete(`/api/pedalpost/comments/${post._id}/comments/${comment._id}`)
                                    .then(res => {
                                        newGetComments(post._id)
                                        alert(`Successfully deleted the comment`)
                                    })
                                    .catch(err => console.log(err))                  
                        }}><Avatar size={32} color="blue"><IconTrash /></Avatar></ UnstyledButton>}
                        </Group>
                        <p>{comment.comment}</p>
                        <h4 className="comment-date"> commented on {new Date(post.datePosted).toLocaleDateString()}</h4>
                        {user._id === comment.user &&
                        <Button
                        onClick={()=>setEditMode(prev => !prev)}
                        stlye={{marginBottom: 20, marginLeft: 20}}
                        >
                          {
                          editMode ? "Cancel " : "Edit Comment"}
                        </Button>}
                        {editMode && user._id === comment.user &&
                        <div>
                            <Input
                            name="editComment"
                            onChange={onChange}
                            value={editInput.editComment}
                            style={{margin: 30}}
                            />
                            <Button
                            onClick={()=>{updateComment(post._id, comment._id, editInput.editComment)
                            setEditMode(false)
                            }}>submit</Button>
                        </div>
                        }
    </Card>
  
  </>
  )
}
