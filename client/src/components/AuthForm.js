import React, {useState} from 'react'
import {Button, TextInput} from '@mantine/core';

export default function AuthForm(props) {
    const { 
        handleChange,
        handleSubmit,
        btnText,
        errMsg,
        inputs: {
            username,
            password
        }
    } = props

console.log("errMsg", errMsg)

const [value, setValue] = useState('')

  return (
    <form className="auth-form"  onSubmit={handleSubmit}>
        <TextInput
            type="text"
            value={username}
            name="username"
            onChange={handleChange}
            placeholder="Username"
            className="form-input"
            style={{width: 300, marginBottom: 20}}
        />
        <TextInput
            type="text"
            value={password}
            name="password"
            onChange={handleChange}
            placeholder="Password"
            className="form-input"
            style={{width: 300}}
        />
        <Button type="submit" className="form-button">{btnText}</Button>
        <h3 style={{color: "red"}}>{errMsg}</h3>
    </form>
  )
}
