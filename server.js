const path = require("path");
const fs = require("fs");
//requiring the data for the route
const { notes } = require("./db/notes.json");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 9001;


app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

// route type to reference the data { notes }
app.get('/api/notes', (req, res) => {
    // let results = notes;
    // if (req.query) {
    //     results = filterByQuery(req.query, results);
    // }
    res.json(notes)
});

//connecting the html framework
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'))
// });
// app.get('/notes', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/notes.html'))
// });

// listener
app.listen(PORT, () => {
    console.log(`server connected to port ${PORT}!`);
});