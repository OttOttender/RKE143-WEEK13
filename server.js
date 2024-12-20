const express = require('express');
const bodyParser = require('body-parser');
const todoRouter = require('./routes/todo.routes');  
const dotenv = require('dotenv');
const app = express();


dotenv.config();

app.use(bodyParser.json()); 

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/tasks', todoRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}.`);
});
