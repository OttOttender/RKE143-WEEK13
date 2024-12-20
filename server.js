
const express = require('express');
const bodyParser = require('body-parser');
const todoRouter = require('./todo.routes'); 
const dotenv = require('dotenv');
const app = express();

dotenv.config();


app.use(bodyParser.json());  


app.use('/todo', todoRouter);

app.listen(3000, () => {
    console.log('Server is running on Port 3000.');
});
