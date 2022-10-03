import React, { useContext, useEffect} from 'react'
import {UserContext} from '../context/UserProvider.js'
import {useNavigate} from 'react-router-dom'
import {Card, Text, Button, Image} from '@mantine/core';


export default function Post(props) {
    const { title, imgUrl, datePosted, _id, username } = props

    const navigate = useNavigate();

    const {getUserPosts} = useContext(UserContext)

    useEffect(() => {     
        getUserPosts(_id)
          // eslint-disable-next-line
    }, [])


    return(
        <Card shadow="sm" p="lg" radius="md" withBorder style={{margin:20, width: 300}}>
        <Card.Section>
            <Image height={300} onClick={()=>navigate(`/postpage/:${_id}`)} src={imgUrl}/>
        </Card.Section>
    <Text align="center" size="xl" onClick={()=>navigate(`/postpage/:${_id}`)}>{title}</Text>
    <Text> posted by: {username}</Text>
    <Text> posted on {new Date(datePosted).toLocaleDateString()}</Text>
    <Button style={{marginLeft: 20, marginTop: 20}}  onClick={()=>navigate(`/postpage/:${_id}`)} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Go To Page</Button>
    </Card>
        )
}