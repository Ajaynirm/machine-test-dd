import React, { useEffect } from "react";
import { useState } from "react";
import "./employeEdit.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const EmployeEdit = () => {  
  const location = useLocation();
  const { data } = location.state || {};
  const [name, setName] = useState(data?.f_Name || '');
  const [email, setEmail] = useState(data?.f_Email || '');
  const [mobile, setMobile] = useState(data?.f_Mobile || '');
  const [desig, setDesig] = useState(data?.f_Designation || 'HR');
  const [gender, setGender] = useState(data?.f_Gender || 'Male');
  const [course, setCourse] = useState(data?.f_Course || 'B.E');
  const [selectedImg, setSelectedImg] = useState(data?.f_Image || null);
 
  const navigate =useNavigate();
  // const location = useLocation();
  // const {newData}= location.state?.data || {};
  useEffect(() => {
    if(data){
    setName(data?.f_Name || "");
    console.log(name);
    setEmail(data?.f_Email || "");
    setMobile(data?.f_Mobile || "");
    setDesig(data?.f_Designation || "");
    setGender(data?.f_Gender || "");
    setCourse(data?.f_Course || "");
    setCourse(data?.f_Image || "");
    }
    
  },[data]);

  const setImageFunc = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImg(file);
    }
  };
  const handleDesig = (e) => {
    // console.log(e.target.value)
    setDesig(e.target.value);
  };
  const handleCheck = (e) => {
    setGender(e.target.value);
  };
  const updateCourse = (e) => {
    const newCourse = e.target.value;
    if (newCourse == course) {
      setCourse("");
    } else {
      setCourse(newCourse);
    }
  };
 
 
  const sendDataToBackend = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !email ||
      !mobile ||
      !desig ||
      !gender ||
      !course 
    ) {
      return alert("PLEASE FILL ALL THE FIELDS CORRECTLY");
    }
    try {
      const data1 = {
        f_Name: name,
        f_Email: email,
        f_Mobile: mobile,
        f_Designation: desig,
        f_Gender: gender,
        f_Course: course,
        f_Image: selectedImg,
      };
      const response = await axios.put(
        "http://localhost:3000/api/updateEmployee",
        data1
      );
      if(response.status===200){
      console.log("Data updated successfully:", response.data);
      alert("Data updated successfully");
      navigate('/emplist');
      }
    } catch (error) {
      alert("data not updated retry");
      console.error("Error while update the data ..: ", error);
    }
  };
  const deleteDatafromBackend = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.delete('http://localhost:3000/api/deleteEmployee',{
        data : {f_Email: email}
      }
      );
      if(response){
        alert("Data deleted successfully");
      navigate('/emplist');
      }
     
     
    }catch(e){
     console.log(e.message);
    }
  }

  const openHome = () => {
    navigate('/home-page');
  }
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
        <div className="head-container">
          <div  onClick={openHome} className='mouse-btn'>Home</div>
          <div onClick={openEmployList} className='mouse-btn'>Employee List</div>
          <div>{localStorage.getItem("username")}</div>
          <div onClick={handleLogout} className='mouse-btn'> logout</div>
        </div>
        <div>Edit Employee</div>
      </div>
      
        <div className="container">
        <form>
        <div className="sub-container-c">
          <label htmlFor="name">Name</label>
          <input
            className="input-box"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="sub-container-c">
          <label htmlFor="email">Email</label>
          <input
            className="input-box"
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="sub-container-c">
          <label htmlFor="mobile">Mobile no</label>
          <input
            className="input-box"
            id="mobile"
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        <div className="sub-container-c">
          <div>
          <label htmlFor="options">Designation</label>
          </div>
          
          <div>
          <select id="options" value={desig} onChange={handleDesig} className="designation">
            <option value={""} >select</option>
            <option value="Sales">Sales</option>
            <option value="Hr">HR</option>
            <option value="developer">Developer</option>
            <option value="tester">Tester</option>
          </select>
          </div>
         
        </div>

        <div className="sub-container-c">
          <label htmlFor="gender">Gender</label>
          <label>
            <input
              id="gender"
              type="radio"
              value="male"
              checked={gender === "male"}
              onChange={handleCheck}
            />
            male
          </label>
          <label htmlFor="female">
            <input
            id="female"
              type="radio"
              value="female"
              checked={gender === "female"}
              onChange={handleCheck}
            />
            female
          </label>
        </div>

        <div className="sub-container-c">
          <label>Course</label>
          <div>
            <label htmlFor="me">M.E</label>
            <input
              type="checkbox"
              name=""
              id="me"
              value={"M.E"}
              onChange={updateCourse}
              checked={course === "M.E"}
            />
          </div>
          <div>
            <label htmlFor="be">B.E</label>
            <input
              type="checkbox"
              name=""
              id="be"
              value={"B.E"}
              onChange={updateCourse}
              checked={course === "B.E"}
            />
          </div>
          <div>
            <label htmlFor="bt">B.Tech</label>
            <input
              type="checkbox"
              name=""
              id="bt"
              value={"B.TECH"}
              onChange={updateCourse}
              checked={course == "B.TECH"}
            />
          </div>
        </div>

        <div className="sub-container-c">
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
        
        <div className='sub-container-c'>
          <button onClick={sendDataToBackend} className="login-btn">Update</button>
          <button onClick={deleteDatafromBackend} className="login-btn">Delete</button>
        </div>
        </form>                                   
      </div>
    </>
  );
};

export default EmployeEdit;
