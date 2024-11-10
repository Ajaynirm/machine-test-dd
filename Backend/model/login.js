import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
    f_sno:{
        type: Number,
        required: true
    },
    f_userName: {
        type: 'String',
        required: true
    },
    f_Pwd:{
        type: 'String',
        required: true
    }
});

export default mongoose.model('t_login',loginSchema);