import React, {useEffect, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'

import { UserContext } from '../context/UserProvider.js'
import { Grid, useMantineTheme, Card, Image, Group, Text, Badge, Button } from '@mantine/core';


export default  function PublicPost(props) {
    const navigate = useNavigate();

    const { author, imgUrl, title, description, datePosted, _id } = props

    const { getUserPosts, allUsers } = useContext(UserContext)


    useEffect(() => {
        getUserPosts(_id)
    }, [])


    
    return(
            <Card shadow="sm" p="lg" radius="md" withBorder style={{margin:20, width: 300}}>
                <Card.Section>
                    <Image height={300} onClick={()=>navigate(`/postpage/:${_id}`)} src={imgUrl}/>
                </Card.Section>
                <Text align="center" size="xl" onClick={()=>navigate(`/postpage/:${_id}`)}>{title}</Text>
                <Text> posted by: {allUsers.find(u => u._id === author)?.username}</Text>
                <Text> posted on {new Date(datePosted).toLocaleDateString()}</Text>
                <Button style={{marginLeft: 150, marginTop: 20}}  onClick={()=>navigate(`/postpage/:${_id}`)} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Go To Page</Button>
            </Card>

    )
}