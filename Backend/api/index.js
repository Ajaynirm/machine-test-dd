import express from 'express';
import cors from 'cors';
import startDBServer from '../database/connectDb.js';
import t_Employee from '../model/employee.js'
import t_login from '../model/login.js'
import bodyParser from 'body-parser';
import session from 'express-session'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import {Strategy} from 'passport-local'

const app=express();

app.use(cors());
app.use(express.json()); 
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());
app.use(session({
  secret:'hi',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: false }, 
}));

// app.use(passport.initialize());
// app.use(passport.session());


app.get('/', (req,res) => {
   req.session.isAuth = true;
    res.send('Hello World');
    console.log(req.session);
})
app.post('/addAdmin', async (req,res) => {
  const { t_userName , t_Pwd} = req.body;
  console.log(t_userName,t_Pwd);
 

  try{
    const hashedPassword = await bcrypt.hash(t_Pwd,10);
   const newAdmin = new t_login({t_userName,t_Pwd:hashedPassword});
   console.log(hashedPassword);
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
      const user = await t_login.findOne({ t_userName });
      if (!user) {
        return res.status(400).json({ success: false, message: 'User  not found' });
      }
      
      const isMatch = await bcrypt.compare(t_Pwd , user.t_Pwd);
      console.log(user.t_Pwd);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Invalid  password' });
      }
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
      { f_Email },  
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
    
    return res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update employee data' });
  }
});

app.delete('/api/deleteEmployee', async (req, res) => {
  const { f_Email } = req.body;

  if (!f_Email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
  
    const deletedEmployee = await t_Employee.findOneAndDelete({ f_Email });

    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully', data: deletedEmployee });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Failed to delete employee' });
  }
});

startDBServer();
app.listen(3000, () => {
    console.log('server is listening on port 3000');
})



