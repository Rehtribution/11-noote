const path = require("path");
const fs = require("fs")


const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));


// const apiRoutes = require('./Develop/public/server')
// const htmlRoutes = require('./develop/public/assets/js/index')


// API routes
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);


// listener
app.listen(PORT, () => {
    console.log('server connected to port ${PORT}!');
});