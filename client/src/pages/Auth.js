import React, {useState, useContext} from 'react'
// import Video from "./video/psychVideo.mp4"

import AuthForm from '../components/AuthForm'
import { UserContext } from '../context/UserProvider.js'

const initInputs = {username: "", password: ""}

export default function Auth() {
    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(false)

    const { signup, login, errMsg, resetAuthErr } = useContext(UserContext)

    console.log("errMsg", errMsg)

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSignup(e){
        e.preventDefault()
        signup(inputs)
    }

    function handleLogin(e){
        e.preventDefault()
        login(inputs)
    }

    function toggleForm(){
        setToggle(prev => !prev)
        resetAuthErr()
    }

  return (
    <div className="auth-container">
        {/* <video className="auth-video" autoPlay loop muted src={Video}></video> */}
        <h1>PedalPosts</h1>
        { !toggle ?
            <>
                <AuthForm
                    handleChange={handleChange}
                    handleSubmit={handleSignup}
                    inputs={inputs}
                    btnText="Sign up"
                    errMsg={errMsg}
                    />
                    <p onClick={toggleForm}>Already a member?</p>
            </>
        :
            <>
                <AuthForm
                    handleChange={handleChange}
                    handleSubmit={handleLogin}
                    inputs={inputs}
                    btnText="Login"
                    errMsg={errMsg}
                />
                <p onClick={toggleForm}>Not a member?</p>
            
            </>
        }
    </div>
  
  )
}
