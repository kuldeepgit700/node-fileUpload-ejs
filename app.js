// app.js
const express = require('express');
const mongoose = require('mongoose');
const uploadRoutes = require('./routes/upload');
const path = require('path');
const dotEnv = require('dotenv');
const logger = require('./loggers/logger');
dotEnv.config();

const app = express();


process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION, APP SHUTTING NOW!!");
    console.log(err.message, err.name);
    process.exit(1);
  });

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(success => {
    // logger.logInfo('connected!');
    logger.log("info", "connect!");
    logger.debug("The is the home '/' route.");
    console.log('connected!');
}).catch(err =>{
    logger.error(err.message);
    logger.debug("The is the home '/' route.");
   // logger.logInfo(err.message);
});

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', uploadRoutes);

app.listen(3000, () => {
  logger.info("'Server is running on port : 3000");
  console.log('Server is running on port 3000');
});
