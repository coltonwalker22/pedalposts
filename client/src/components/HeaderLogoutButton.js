import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {AppShell, Navbar,Header, Button, Text, Group, MediaQuery, Burger, useMantineTheme} from '@mantine/core';

export default function Headers(props) {
const {logout} = props
  let navigate = useNavigate()

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

    function onClickLogout(){ 
      logout();
      navigate("/");
    }

  return (
    
    <>
      <Text size="xl" color="blue" style={{margin: 10,  width: 130, cursor:"pointer"}}  onClick={()=>navigate(`/profile`)} >Profile</Text>
      <Text size="xl" color="teal" style={{margin: 10,  width: 130, cursor:"pointer"}}  onClick={()=>navigate(`/public`)}>Public Page</Text>
      <Text  size="xl" color="red" style={{margin: 10, width: 130, cursor:"pointer"}} onClick={onClickLogout}>Logout</Text>  
    </>
  )
}
