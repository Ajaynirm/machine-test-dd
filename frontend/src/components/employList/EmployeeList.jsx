import React from 'react'
import { useState,useEffect } from 'react';
import './emplist.css'

const EmployeeList = () => {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const getEmployeesFromDatabase = async () => {
            try{
              const res = await fetch('url');
              const data = await res.json();
              setEmployees(data);
            }catch(e){
                console.log(e);
            }
        }
    getEmployeesFromDatabase();

    },[]);
  return (
        <>


<div>Logo</div>
        <div className="container">
            <div className='head-container'>
                <div>Home</div>
                <div>Employee List</div>
                <div>Hukum Gupta Username</div>
                <div> logout</div>
            </div>
            <div>Employee List</div>
           
        </div>
         <div   className='employ-grid'>
                
      {/* Grid Header */}
      <div className='grid-row'>
        <span> Unique ID</span>
        <span>Image</span>
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
      {employees && employees.length > 0 ? employees.map((employee) => (
        <div key={employee.id} className='grid-row'>
          <span>{employee.id}</span>
          <span>{employee.name}</span>
          <span>{employee.designation}</span>
          <span>{employee.email}</span>
        </div>
      )) : <p>No employees found in the database </p>}
    </div>
  
        </>
  )
}

export default EmployeeList