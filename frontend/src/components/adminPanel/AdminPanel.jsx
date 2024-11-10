import React from 'react'
import './adminpanal.css'
import { useNavigate } from 'react-router-dom'


const AdminPanel = () => {

  const navigate = useNavigate();

  const openEmployList = () => {
   navigate('/emplist');
  }
  const handleLogout = () => {
    navigate('/login-page');
  }

  return (
    <>
        <div>Logo</div>
        <div className="container">
            <div className='head-container'>
                <div>Home</div>
                <div onClick={openEmployList}>Employee List</div>
                <div>{localStorage.getItem('username')}</div>
                <div onClick={handleLogout}> logout</div>
            </div>
            <div>dashboard</div>
            <div className='welcome-container'>Welcome to Admin Panel </div>
        </div>

    </>
  
  )
}

export default AdminPanel;