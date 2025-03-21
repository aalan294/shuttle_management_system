const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3400;
const DB_URL = process.env.DB_URL;

app.use(cors());

app.listen(PORT,()=>{
    console.log(`server running in port ${PORT}`);
})

mongoose.connect(DB_URL).then(()=>{
    console.log('connected to database');
})

app.use(express.json());

//Student Routes
app.use('/api/student',require('./ROUTES/StudentRouter'));
app.use('/api/admin',require('./ROUTES/AdminRouter'))