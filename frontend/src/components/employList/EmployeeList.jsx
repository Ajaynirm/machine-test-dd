import React from 'react'
import { useState,useEffect } from 'react';
import './emplist.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployeeList = () => {

    const [employees, setEmployees] = useState([]);

    const navigate = useNavigate();

    const openEmployList = () => {
     navigate('/emplist');
    }
    const handleLogout = () => {
      navigate('/login-page');
    }
    const openHome = () => {
      navigate('/home-page');
    }

    useEffect(() => {
        const getEmployeesFromDatabase = async () => {
            try{
              console.log('fetching')
              const response = await axios.get('http://localhost:3000/api/data'); 
              setEmployees(response.data.data || response.data);
              console.log('got')
              console.log(response.data);
            }catch(e){
                console.log('error while fetching the data',e);
            }
        }
    getEmployeesFromDatabase();
    
    },[]);
  return (
        <>


<div>Logo</div>
        <div className="container">
            <div className='head-container'>
                <div onClick={openHome} className='mouse-btn'>Home</div>
                <div onClick={openEmployList} className='mouse-btn'>Employee List</div>
                <div>{localStorage.getItem('username')}</div>
                <div onClick={handleLogout} className='mouse-btn'> logout</div>
            </div>
            <div>Employee List</div>
           
        </div>
         <div   className='employ-grid'>
                
      {/* Grid Header */}
      <div className='grid-row'>
        <span> Unique ID</span>
        {/* <span>Image</span> */}
        <span>Name</span>
        <span>Email</span>
        <span>Mobile No</span>
        <span>Designation</span>
        <span>Gender</span>
        <span>course</span>
        <span>created Date</span>
        <span>Action</span>
        
      </div>

      {/* Grid Rows */}
      {employees && employees.length > 0 ? employees.map((employee,ind) => (
        <div key={ind} className='grid-row'>
          <span>{employee.id || "N/A"}</span>
          {/* <span>{employee.f_Image || "N/A"}</span> */}
          <span>{employee.f_Name || "N/A"}</span>
          <span>{employee.f_Email || "N/A"}</span>
          <span>{employee.f_Mobile || "N/A"}</span>
          <span>{employee.f_Designation || "N/A"}</span>
          <span>{employee.f_Gender || "N/A"}</span>
          <span>{employee.f_Course || "N/A"}</span>
          <span>{employee.f_Createdate || "N/A"}</span>
          <span>Edit/Delete</span>
        </div>
      )) : <p>No employees found in the database </p>}
    </div>
  
        </>
  )
}

export default EmployeeList; 