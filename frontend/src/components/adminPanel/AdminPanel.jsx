import React from 'react'
import './adminpanal.css'
import { useNavigate } from 'react-router-dom'


const AdminPanel = ({onLogout}) => {

  const navigate = useNavigate();

  const openEmployList = () => {
   navigate('/emplist');
  }
  const openCreateEmployee = () => {
    navigate('/createEmp');
  }
 const logout = () => {
  alert('logout successfully')
  navigate('/login');
 }

  return (
    <>
        <div>Logo</div>
        <div className="container">
            <div className='head-container'>
                <div className='mouse-ptn'>Home</div>

                <div onClick={openEmployList} className='mouse-ptn'>Employee List</div>
                <div onClick={openCreateEmployee} className='mouse-ptn'>Create Employee</div>
                <div>{localStorage.getItem('username')}</div>
                <div onClick={logout} className='mouse-ptn'> logout</div>
            </div>
            <div>dashboard</div>
            <div className='welcome-container'>Welcome to Admin Panel </div>
        </div>

    </>
  
  )
}

export default AdminPanel;