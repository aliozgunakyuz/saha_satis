import mongoose from 'mongoose';

export const Schema_Client = new mongoose.Schema({
    clientname: {
        type: String,
        required: true,
        unique: false,
    },
    clientaddress: {
        type: String,
        required: true,
        unique: true,
    },
    clientphone: {
        type: Number,
        required: true,
        unique: false,
    },
    clientmail: {
        type: String,
        required: true,
        unique: true,
    },
});

export default mongoose.model('Client', Schema_Client);
