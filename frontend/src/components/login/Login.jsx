import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './login.css'
import axios from 'axios';

const Login = ({onLogin}) => {
    const [userName,setUserName] = useState('');
    const [validName,setValidName] =useState(false);
    const [validPass,setValidPass] =useState(false);
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const setName = (name) => {
        setValidName(false);
      setUserName(name);
      if(name.length >0){
        setValidName(true);
      }
    }
    const setPass = (pass) => {
        setValidPass(false);
       setPassword(pass);
       if(pass.length > 2) setValidPass(true);
    }
    const submit = async (e) => {
      e.preventDefault();
        if(!validName || !validPass){
          return alert('please fill all fields correctly');
        }
        localStorage.setItem('username',userName);
        // navigate('/main-page');
        try {
          const response = await axios.post('http://localhost:3000/api/login', {
            t_userName:userName,
            t_Pwd:password,
          });
          console.log(response);
          if (response.data.success) {
            onLogin();
            navigate('/main-page');
            alert('Login successfull');
          } else {
            console.log('Invalid login credential');
          }
         } catch (err) {
             console.log(err);
             alert('server error');
        }
    }

useEffect( () => {
  // localStorage.setItem('username','ajay');
}
  ,[]);

  return (
    <>
    <div>Logo</div>
   
    <div className='login-container'>
    <form >
    <div className='sub-container'>
    <div>Login</div>
      </div>
        <div className='sub-container'>

        <label htmlFor='username'>Username</label>
        <input
        className='input-box'
          id='username'
          type="text" 
          value={userName}
          onChange={(e) => setName(e.target.value)}
        />
      
        </div>
      
      <div className='sub-container'>
      <label htmlFor='password'>Password</label>
        <input
        className='input-box'
          id="password"
          type="password" 
          value={password}
          onChange={(e) => setPass(e.target.value)}
        />
        
      </div>
      <div className='sub-container-alert'>
         <div>{!validName ? "Enter valid Username" : (!validPass) ? "Enter valid Password" : "done"}</div>
      </div>
       <div className='sub-container-alert'>
         <button onClick={submit} className='login-btn'>Login</button>
       </div>
    </form>
    </div>
    </>
  )
}

export default Login