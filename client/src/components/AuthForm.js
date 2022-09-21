import React from 'react'

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



  return (
    <form onSubmit={handleSubmit}>
        <input
            type="text"
            value={username}
            name="username"
            onChange={handleChange}
            placeholder="Username"
            className="form-input"
        />
        <input
            type="text"
            value={password}
            name="password"
            onChange={handleChange}
            placeholder="Password"
            className="form-input"
        />
        <button>{btnText}</button>
        <h3 style={{color: "red"}}>{errMsg}</h3>
    </form>
  )
}
