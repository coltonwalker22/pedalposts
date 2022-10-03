import React, {useState} from 'react'
import {Button, Input, Textarea} from '@mantine/core';

const initInputs = {
    title: "",
    description: "",
    imgUrl: ""
}

export default function PostForm(props) {
    const [inputs, setInputs] = useState(initInputs)
    const { addPost } = props


    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }
    
    function handleSubmit(e){
        e.preventDefault()
        addPost(inputs)
        setInputs(initInputs)
    }

const {title, description, imgUrl} = inputs

    return( 
        <form className="form-container" onSubmit={handleSubmit}>
            <Input
                className="input-title"
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                placeholder="Title"
                style={{width: 350, marginBottom: 20}}
            />
            <Input
                className="input-imgUrl"
                type="text"
                name="imgUrl"
                value={imgUrl}
                onChange={handleChange}
                placeholder="Image Url"
                style={{width: 350}}
            />
            <Textarea
                style={{width: 350, marginTop: 20, marginBottom: 20}}
                type="text"
                name="description"
                value={description}
                onChange={handleChange}
                placeholder="Description"
            />
            <Button type="submit">Add Post</Button>
        </form>
    )
}