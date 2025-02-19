import express from 'express';
import bodyParser from 'body-parser'
require("dotenv").config();
import viewEngine from './config/viewEngine';
import initWebRouters from './router/web'
import connectDB from './config/connectDB';
const app = express();
//congif app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));

viewEngine(app);
initWebRouters(app);
connectDB();
const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log("Backend Nodejs is running on the port : " + port);
    
})