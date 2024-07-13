const express = require('express');
const db = require('./db');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT=process.env.PORT||3500
// const PORT=3500;
app.get('/',(req,res)=>{
    res.send('welcome to nayana ben hotels ')
})

const personRouter = require('./routers/personRouter');

app.use('/person', personRouter);
const menuRouter = require('./routers/menuRouter');

app.use('/menu', menuRouter);

app.listen(PORT, () => {
    console.log(`server is listing on port 3500`);
});
//