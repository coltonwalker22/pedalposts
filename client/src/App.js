import React, {useContext} from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {UserContext} from './context/UserProvider.js'

import ProtectedRoute from './components/ProtectedRoute.js'
import Navbar from './components/Navbar.js'

import Auth from './pages/Auth'
import Profile from './pages/Profile'
import Public from './pages/Public'
import PostPage from './pages/PostPage'

import './App.css';
import './styles/navbar.css'
import './styles/auth.css'
import './styles/authform.css'
import './styles/postform.css'
import './styles/profile.css'
import './styles/post.css'
import './styles/publicpost.css'
import './styles/postpage.css'

function App() {
  const { token, logout } = useContext(UserContext)

  return (
<Router>
      { token && <Navbar logout={logout} /> }
      <Routes>
        <Route 
        path="/" 
        element={ token ? <Navigate to="/profile"/> : <Auth />}/>
        <Route 
        path="/profile" 
        element={
          <ProtectedRoute token={token} redirectTo="/">
            <Profile />
          </ProtectedRoute>
          } 
        />
        <Route 
        path="/public"
         element={
         <ProtectedRoute token={token} redirectTo="/">
          <Public />
         </ProtectedRoute>
          } 
         />
        <Route 
        path="/postpage/:id"
         element={
         <ProtectedRoute token={token} redirectTo="/">
          <PostPage />
         </ProtectedRoute>
          } 
         />
      </Routes>
    </Router>
  );
}

export default App;
