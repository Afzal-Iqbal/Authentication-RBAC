const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const dbConnect = async () => {
try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connect.connection.host}`, `${connect.connection.host}`);

    
} catch (error) {
    console.log(error);
    process.exit(1);
}}

module.exports = dbConnect;