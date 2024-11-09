import React from 'react'

const EditEmployee = () => {
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
        <div>Create Employee</div>

           
        <div className='sub-container'>
         
    <label>Name</label>
    <input
    className='input-box'
      id='name'
      type="text" 
      value={"a"}
    //   onChange={(e) => setName(e.target.value)}
    />
  
    </div>
  
  <div className='sub-container'>
  <label>Email</label>
    <input
    className='input-box'
      id="text"
      type="email" 
      value={"a@gmail.com"}
    //   onChange={(e) => setPass(e.target.value)}
    />
        </div>

        <div className='sub-container'>
  <label>Mobile no</label>
    <input
    className='input-box'
      id="mobile"
      type="number" 
      value={2}
    //   onChange={(e) => setPass(e.target.value)}
    />
        </div>

        <div className='sub-container'>
  <label>Designation</label>
    <input
    className='input-box'
      id="designation"
      type="number" 
      value={2}
    //   onChange={(e) => setPass(e.target.value)}
    />
        </div>
    </div>

    <div className='sub-container'>
  <label>Gender</label>
    <input
    className='input-box'
      id="gender"
      type="text" 
      value={"a"}
    //   onChange={(e) => setPass(e.target.value)}
    />
        </div>

        <div className='sub-container'>
  <label>Course</label>
    <input
    className='input-box'
      id="course"
      type="text" 
      value={"a"}
    //   onChange={(e) => setPass(e.target.value)}
    />
        </div>

        <div className='sub-container'>
  <label>Image Upload</label>
    <input
    className='input-box'
      id="imagee"
      type="text" 
      value={".png"}
    //   onChange={(e) => setPass(e.target.value)}
    />
        </div>
        

</>
  )
}

export default EditEmployee