import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar(props) {

  let navigate = useNavigate()
  const { logout } = props

    function onClickLogout(){ 
      logout();
      navigate("/");
    }

  return (
    <>
      <div className="navbar">
      <div className="navbar-title">
        <h1>PedalPosts</h1>
      </div>
      <div className="navbar-links">
        <div className="profile-button"><Link to="/profile" style={{textDecoration:"none"}}>Profile</Link></div>
        <div className="public-button"><Link to="/public" style={{textDecoration:"none"}}>Public</Link></div>
        <div className="logout-button"onClick={onClickLogout}>logout</div>
      </div>
      </div>
    
    </>
  )
}
