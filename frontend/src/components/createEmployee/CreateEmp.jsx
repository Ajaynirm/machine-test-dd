import React, { useState } from "react";
import "./createEmp.css";
import axios from 'axios'

const CreateEmp = () => {
  const [name,setName] =useState(null);
  const [email,setEmail] = useState(null);
  const [mobile,setMobile] = useState(null);
  const [desig,setDesig] = useState(null);
  const [gender,setGender] = useState(null);
  const [course,setCourse] = useState(null);
  const [selectedImg,setSelectedImg]=useState(null);

  const setImageFunc = (event) => {
      const file = event.target.files[0];
      if (file) {
        setSelectedImg(file); 
      }
  }
  const handleDesig = (e) => {
    // console.log(e.target.value)
    setDesig(e.target.value);
   
  }
  const handleCheck = (e) => {
     setGender(e.target.value);
  }
  const updateCourse = (e) => {
    const newCourse = e.target.value;
    if(newCourse == course){
      setCourse('');
    }else{
      setCourse(newCourse);
    }

  }
  const data = {
    f_Name:name,
    f_Email:email,
    f_Mobile:mobile,
    f_Designation:desig,
    f_Gender:gender,
    f_Course:course,
    f_Image:selectedImg,
  };

  const sendDataToBackend = async () => {
   if(!name && !email && !mobile && !desig && !gender && !course && !selectedImg){
    return alert('Please fill all the fields correctly');
   }
    try {
      const response = await axios.post('http://localhost:3000/api/createEmployee', data);
      console.log('Data sent successfully:', response.data);
    } catch (error) {
      console.error('Error: ' , error);
    }
  };

  return (
    <>
      <div>Logo</div>
      <div className="container">
        <div className="head-container">
          <div>Home</div>
          <div>Employee List</div>
          <div>{localStorage.getItem('username')}</div>
          <div> logout</div>
        </div>
        <div>Create Employee</div>

        <div className="sub-container">
          <label>Name</label>
          <input
            className="input-box"
            id="name"
            type="text"
            value={name}
              onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="sub-container">
          <label>Email</label>
          <input
            className="input-box"
            id="text"
            type="email"
            value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="sub-container">
          <label>Mobile no</label>
          <input
            className="input-box"
            id="mobile"
            type="text"
            value={mobile}
              onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        <div className="sub-container">
          <label>Designation</label>
           <select id="options" value={desig} onChange={handleDesig}>
        <option value="">Select...</option>
        <option value="Sales">sales</option>
        <option value="Hr">Hr</option>
        <option value="developer">developer</option>
        <option value="tester">tester</option>
      </select>
        </div>
      

      <div className="sub-container">
        <label>Gender</label>
<label>
        <input
          type="radio"
          value="male"
          checked={gender === "male"}
          onChange={handleCheck}
        />
        male
      </label>
      <label>
        <input
          type="radio"
          value="female"
          checked={gender === "female"}
          onChange={handleCheck}
        />
        female
      </label>
      </div>

      <div className="sub-container">
          <label>Course</label>
          <div>
            <label htmlFor="me">M.E</label>
          <input type="checkbox" name="" id="me" value={'M.E'} onChange={updateCourse} checked={course==='M.E'}/> 
          </div>
          <div>
            <label htmlFor="be">B.E</label>
          <input type="checkbox" name="" id="be" value={'B.E'} onChange={updateCourse} checked={course==='B.E'}/> 
          </div>
          <div>
            <label htmlFor="bt">B.Tech</label>
          <input type="checkbox" name="" id="bt" value={'B.TECH'} onChange={updateCourse} checked={course==='B.TECH'}/> 
          </div>
      
        </div>

      <div className="sub-container">
        <label>Image Upload</label>
        <input
          className="input-box"
          id="imagee"
          type="file"
          accept="image/*"
          
            onChange={setImageFunc}
        />
         {selectedImg && (
        <img
          src={selectedImg}
          alt="Preview"
          style={{ width: "200px", height: "30px", marginTop: "10px" }}
        />
      )}
      </div>
         <button onClick={sendDataToBackend}>submit</button>
    </div>  
    </>
  );
};

export default CreateEmp;
