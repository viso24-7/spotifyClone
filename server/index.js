const express = require('express');
const app = express();
require('dotenv').config();
const {connectDb} = require('./db/db');
const authRoute = require('./routers/auth');
const port = process.env.PORT;

connectDb();
app.use(express.json());
app.use('/auth',authRoute);

app.listen(port,() => {
    console.log(`Server is runing on port ${port}`)
})