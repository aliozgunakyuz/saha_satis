import mongoose from 'mongoose';

export const Schema_User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false,
    },
    surname: {
        type: String,
        required: true,
        unique: false,
    },
    password: {
        type: String,
        required: true,
        unique: false,
    },
    mail: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    userType:{
        type: String, 
        default:'user',
    },

});

export default mongoose.model('User', Schema_User);
