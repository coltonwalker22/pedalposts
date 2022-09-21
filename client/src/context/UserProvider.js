import React, {useState} from 'react'
import axios from 'axios'

export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})



export default function UserProvider(props){

    const initState = { 
        user:  JSON.parse(localStorage.getItem('user')) || {}, 
        token: localStorage.getItem('token') || "", 
        posts: [],
        errMsg: ""
    }

    const [userState, setUserState] = useState(initState)
    const [allPosts, setAllPosts] = useState([])
    const [allUsers, setAllUsers] = useState([])

    function signup(credentials) {
        axios.post('/auth/signup', credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }


    function login(credentials) {
        axios.post('/auth/login', credentials)
        .then(res => {
            const { user, token } = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            getUserPosts()
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
            user: {},
            token: "",
            posts: []
        })
    }

    function handleAuthErr(errMsg){
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    function resetAuthErr(){
        setUserState(prevState => ({
            ...prevState,
            errMsg: ""

        }))
    }

    function getUserPosts(){
        userAxios.get('/api/pedalpost/user')
            .then(res =>{
                setUserState(prevState => ({
                    ...prevState,
                    posts: res.data
                }))
            })
            .catch(err => console.error(err.response.data.errMsg))
    }

    function addPost(newPost){
        userAxios.post('/api/pedalpost', newPost)
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    posts: [...prevState.posts, res.data]
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }


    function getAllPosts(){
        console.log("getAllPosts")
        userAxios.get('/api/pedalpost/')
        .then(res => setAllPosts(res.data))
        .catch(err => console.log(err.response.data.errMsg))
}

    function getAllUsers(){
        userAxios.get('/api/user')
            .then(res => setAllUsers(res.data))
            .catch(err => console.log(err.response.data.errMsg))
    }


  

    return(
        <UserContext.Provider
        value={{
            ...userState,
            allPosts,
            allUsers,
            signup,
            login,
            logout,
            addPost,
            getAllPosts,
            getAllUsers,
            resetAuthErr,
            getUserPosts,
            userAxios,
        }}
        >
            { props.children}
        </UserContext.Provider>
    )

}