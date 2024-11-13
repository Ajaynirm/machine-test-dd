import mongoose from "mongoose";


const EmployeeSchema = new mongoose.Schema({
    // f_Id: {
    //     type: String,
    //     default: () => uuidv4(), // Ensure a new UUID is generated for each document
    //     unique: true
    // },

    f_Name:{
        type: String,
        required: true
    },
    f_Email:{
        type: String,
        required: true

    },
    f_Mobile:{
        type: String,
        required: true
    },
    f_Designation:{
        type: String,
        required: true
    },
    f_Gender:{
        type: String,
        required: true,
        // enum: ['Male','Female','Others']
    },
    f_Course:{
        type: String,
        required: true
    },
    f_Image: {
        type: String,
    },
   
    f_Createdate:{
        type: Date,
        default: Date.now
    },

});

export default mongoose.model('t_Employee',EmployeeSchema);