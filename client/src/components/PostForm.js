import React, {useState} from 'react'

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
            <input
                className="input-title"
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                placeholder="Title"
            />
            <input
                className="input-imgUrl"
                type="text"
                name="imgUrl"
                value={imgUrl}
                onChange={handleChange}
                placeholder="Image Url"
            />
            <textarea
                type="text"
                name="description"
                value={description}
                onChange={handleChange}
                placeholder="Description"
            />
            <button>Add Post</button>
        </form>
    )
}