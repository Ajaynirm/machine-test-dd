import React from 'react'
import './adminpanal.css'

const AdminPanel = () => {
  return (
    <>
        <div>Logo</div>
        <div className="container">
            <div className='head-container'>
                <div>Home</div>
                <div>Employee List</div>
                <div>{localStorage.getItem('username')}</div>
                <div> logout</div>
            </div>
            <div>dashboard</div>
            <div className='welcome-container'>Welcome to Admin Panel </div>
        </div>

    </>
  
  )
}

export default AdminPanel;