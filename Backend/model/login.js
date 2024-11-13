import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
    t_sno:{
        type: Number
    },
    t_userName: {
        type: 'String',
        required: true
    },
    t_Pwd:{
        type: 'String',
        required: true
    }
});

export default mongoose.model('t_login',loginSchema);