import express from 'express';
import cors from 'cors';
import startDBServer from '../database/connectDb.js';
import t_Employee from '../model/employee.js'
import t_login from '../model/login.js'

const app=express();

app.use(cors());
app.use(express.json()); 

app.get('/', (req,res) => {
    res.send('Hello World');
})
app.post('/addAdmin', async (req,res) => {
  const { t_userName , t_Pwd} = req.body;
  console.log(t_userName,t_Pwd);
 

  try{
   const newAdmin = new t_login({t_userName,t_Pwd});
   await newAdmin.save();
   res.json({ success: true, message: 'Admin added successfully' });
  }catch(e){
   console.log(e.message);
  }

})
app.post('/api/login', async (req, res) => {
    const { t_userName, t_Pwd } = req.body;
   console.log(t_userName,t_Pwd);

    try {
      console.log('up')
      const user = await t_login.findOne({ t_userName });
      console.log('down')
      if (!user) {
        return res.status(400).json({ success: false, message: 'User  not found' });
      }
      console.log("up2")
      const isMatch = (t_Pwd === user.t_Pwd);
      console.log("mid2")
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Invalid username or password' });
      }
      console.log("down2")
      res.json({ success: true, message: 'Login successful' });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });

  app.get('/api/data', async (req, res) => {
    try {
      
      console.log('up')
      const data = await t_Employee.find({});
      console.log('down')
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });

app.post('/api/createEmployee', async (req,res) => {
    const {f_Name,f_Email,f_Mobile,f_Designation,f_Gender,f_Course,f_Image} =req.body;
    console.log(f_Name,f_Email,f_Mobile,f_Designation,f_Gender,f_Course,f_Image);
  
    try{
        console.log(req.body);
        console.log('above');
        const employ=new t_Employee({f_Name,f_Email,f_Mobile,f_Designation,f_Gender,f_Course,f_Image});
        console.log('middle');
        await employ.save();
        console.log('below');
        res.status(201).json({ message: 'Employee created successfully'});
    }catch(e){
        res.status(400).json({ error: e.message });

    }
    
});

app.put('/api/updateEmployee', async (req, res) => {
  const { f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course, f_Image } = req.body;
  
  try {
    const updatedEmployee = await t_Employee.findOneAndUpdate(
      { f_Email: f_Email },  
      {
        f_Name,
        f_Mobile,
        f_Designation,
        f_Gender,
        f_Course,
        f_Image,
      },
      { new: true }  
    );
    
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update employee data' });
  }
});

startDBServer();
app.listen(3000, () => {
    console.log('server is listening on port 3000');
})



