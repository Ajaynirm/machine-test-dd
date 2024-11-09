import React, { useEffect, useState } from 'react'
import './login.css'
const Login = () => {
    const [userName,setUserName] = useState('');
    const [validName,setValidName] =useState(false);
    const [validPass,setValidPass] =useState(false);
    const [password,setPassword] = useState('');
    const setName = (name) => {
        setValidName(false);
      setUserName(name);
      if(name.length >2){
        setValidName(true);
      }
    }
    const setPass = (pass) => {
        setValidPass(false);
       setPassword(pass);
       const check = pass.length > 5 ? true : false;
       if(pass.length >4) setValidPass(true);
    }
    const handleSubmit = (e) => {
        console.log('Form submitted:');
    alert(`Welcome, ${userName}!`);
    }

useEffect( () => {
  localStorage.setItem('username','ajay');
}
  ,[]);

  return (
    <>
    <div>Logo</div>
    <div>Login</div>
    <div className='login-container'>
    <form onSubmit={handleSubmit}>
        <div className='sub-container'>

        <label>Username</label>
        <input
        className='input-box'
          id='username'
          type="text" 
          value={userName}
          onChange={(e) => setName(e.target.value)}
        />
      
        </div>
      
      <div className='sub-container'>
      <label>Password</label>
        <input
        className='input-box'
          id="password"
          type="password" 
          value={password}
          onChange={(e) => setPass(e.target.value)}
        />
        
      </div>
      <div className='sub-container-alert'>
         <div>{!validName ? "Enter valid username" : (!validPass) ? "Enter valid Password" : "username and password are valid"}</div>
      </div>
       <div className='sub-container-alert'>
         <button type='submit'>Login</button>
       </div>
    </form>
    </div>
    </>
  )
}

export default Login