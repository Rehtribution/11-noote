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

//connecting the html framework
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

// route type to reference the data { notes }
app.get('/api/notes', (req, res) => {
    const dataNotes = fs.readFileSync(
        path.join(__dirname, "./db/notes.json"),
        "utf-8"
    );
    const notesParse = JSON.parse(dataNotes);
    res.json(notesParse);
    });

    //pauls nf delete code. need to work on this and solve the issue.
    app.delete("/api/notes/:id", function (req, res) {
        let noteDelete = parseInt(req.params.id);
        for (let i = 0; i < dbjson.length; i++) {
            if (noteDelete === dbjson[i].id) {
                dbjson.splice(i, 1);
                let jsonNote = JSON.stringify(dbjson, null, 2);
                fs.writeFile("./db/db.json", jsonNote, function (err) {
                    if (err) throw err;
                    console.log("Your note has been deleted!");
                    res.json(dbjson);
                });
            }
        }
    });

// listener
app.listen(PORT, () => {
    console.log(`server connected to port ${PORT}!`);
});