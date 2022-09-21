import React, {useEffect, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'

import { UserContext } from '../context/UserProvider.js'

export default  function PublicPost(props) {
    const navigate = useNavigate();

    const { author, imgUrl, title, description, datePosted, _id } = props

    const { user, userAxios, getUserPosts, allUsers } = useContext(UserContext)


    useEffect(() => {
        getUserPosts(_id)
    }, [])


    
    return(
            <div className="publicPost">
                <div>
                <h1 className="title" onClick={()=>navigate(`/postpage/:${_id}`)}>{title}</h1>
                <p> posted by: {allUsers.find(u => u._id === author)?.username}</p>
                    <div className="image-container">
                        <img className="public-post-img" onClick={()=>navigate(`/postpage/:${_id}`)} src={imgUrl}/>
                    </div>
                {/* <p className="description">{description}</p> */}
                <h3> posted on {new Date(datePosted).toLocaleDateString()}</h3>
                </div>
                <Link to={`/postpage/:${_id}`}>Go To Page</Link>
            </div>

    )
}