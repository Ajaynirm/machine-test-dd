import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import Login from './components/login/Login'
import AdminPanel from './components/adminPanel/AdminPanel';
import CreateEmp from './components/createEmployee/CreateEmp';
import EmployeeList from './components/employList/EmployeeList';
import EmployeEdit from './components/employeeEdit/EmployeEdit';

function App() {
 

  return (
    <>
       <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login />}>
        </Route>
        <Route path='/admin' element={<AdminPanel />} >
        </Route>
        <Route path='/createEmp' element={<CreateEmp />} >
        </Route>
        <Route path='/emplist' element={<EmployeeList />} >
        </Route>
        <Route path='/empedit' element={<EmployeEdit />} >
        </Route>

        <Route path="/main-page" element={<AdminPanel />} >
        </Route>
        <Route path="/emplist" element={<EmployeeList />} >
        </Route>
        <Route path="/login-page" element={<Login />} >
        </Route>
        <Route path="/home-page" element={<AdminPanel />} >
        </Route>
        
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
