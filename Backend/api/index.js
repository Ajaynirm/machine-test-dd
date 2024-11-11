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

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
   console.log(username,password);

    try {
      // Find the user by username
      console.log('up')
      const user = await t_login.findOne({ username });
      console.log('down')
      if (!user) {
        return res.status(400).json({ success: false, message: 'Invalid username or password' });
      }
  
      // Check if the password matches
      const isMatch = (password === user.f_Pwd);
      
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Invalid username or password' });
      }
  
      // If the username and password are correct, login is successful
      res.json({ success: true, message: 'Login successful' });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });

  app.get('/api/data', async (req, res) => {
    try {
      // Fetch all documents in the collection
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
    
startDBServer();
app.listen(3000, () => {
    console.log('server is listening on port 3000');
})