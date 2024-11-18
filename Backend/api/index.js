import express from 'express';
import cors from 'cors';
import startDBServer from '../database/connectDb.js';
import t_Employee from '../model/employee.js'
import t_login from '../model/login.js'
import bodyParser from 'body-parser';
import session from 'express-session'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import passport from 'passport';
import initialise from '../passport/passport-config.js';
import flash from 'express-flash'

// if(process.env.NODE_ENV !== 'production'){
//   require('dotenv').config()
// }

const app=express();

initialise(passport);

app.use(cors());
app.use(express.json()); 
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());
app.use(flash());
app.use(session({
  secret: "hi",
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: false }, 
}));
app.use(passport.initialize());
app.use(passport.session());

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}


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
app.post('/api/login',async (req, res, next) => {
  passport.authenticate('local', (err, t_userName,t_Pwd, info) => {
      try{
        const user = await t_login.findOne({t_userName});
        if (!user) {
          return res.status(401).json({ message: info.message || 'Invalid credentials' });
      }
      }
      if (err) {
          return res.status(500).json({ message: 'An error occurred', error: err });
      }
      

      // Log the user in
      req.logIn(user, (err) => {
          if (err) {
              return res.status(500).json({ message: 'Login failed', error: err });
          }
          return res.status(200).json({
              message: 'Login successful',
              user: {
                  id: user._id,
                  username: user.t_userName,
              },
          });
      });
  })(req, res, next);
}

);

  app.get('/api/data',ensureAuthenticated, async (req, res) => {

    if (req.isAuthenticated()) {
      
    try {
      const data = await t_Employee.find({});
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
  else{
    res.status(401).json({ message: 'Unauthorized access' });
}
});

app.post('/api/createEmployee', ensureAuthenticated, async (req,res) => {
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

app.put('/api/updateEmployee',ensureAuthenticated, async (req, res) => {
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

app.delete('/api/deleteEmployee',ensureAuthenticated, async (req, res) => {
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

app.post('/api/logout', (req, res) => {
  req.logout((err) => {
      if (err) return res.status(500).json({ message: 'Error logging out' });
      res.status(200).json({ message: 'Logout successful' });
  });
});

startDBServer();
app.listen(3000, () => {
    console.log('server is listening on port 3000');
})



