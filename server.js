//path directs to files
const path = require("path");
//fs to read and write in the files
const fs = require("fs");
//requiring the data for the route
const { notes } = require("./db/notes.json");


//server specifications
const express = require("express");
const app = express();
const PORT = process.env.PORT || 9001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// consts that will be used later. Pulled out to global for dry-er code.
// reads the data in the database file
const dataNotes = fs.readFileSync(
    path.join(__dirname, "./db/notes.json"),
    "utf-8");
// parse any existing notes into an array
const notesParse = JSON.parse(dataNotes);

// GET start
// route type to reference the data { notes }
app.get('/api/notes', (req, res) => {
    res.json(notesParse);
});

app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

//connecting the html framework
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});
// GET end

// POST start
// write new note to the notes.json file
app.post('/api/notes', (req, res) => {
    //parse existing notes into an array and assign id's
    req.body.id = notesParse.length;
    console.log(notesParse);

    try {
        // push new note into the array
        notesParse.push(req.body);
        //writes the new note into the database file
        fs.writeFileSync(
            path.join(__dirname, "./db/notes.json"),
            JSON.stringify(notesParse),
            "utf-8"
        );
        res.json("note success!")
        console.log("new note posted!");
    } catch (err) {
        throw err;
        console.log("Something went wrong!");
    }
});
// POST end




//functions
function findById(id) {
    const result = notesParse.filter(note => note.id === id)[0];
    return result;
}

app.delete("/api/notes/:id", function (req, res) {
    //read the data
    dataNotes;
    // parse the data
    notesParse;
    // assign the searched ID to a variable
    const deleteThis = findById(req.params.id, notes);
    // delete te note
    if (deleteThis !== -1) {
        notesParse.splice(deleteThis, 1);
        res.status(204).send(notesParse[deleteThis]);
    } else {
        res.status(404).send();
        console.log("Oops, something went wrong. Try again!");
    }


    //     let noteDelete = parseInt(req.params.id);

    //     for (let i = 0; i < notes.length; i++) {
    //         if (noteDelete === notes[i].id) {
    //             notes.splice(i, 1);
    //             let jsonNote = JSON.stringify(notes, null, 2);
    //             fs.writeFile("./db/db.json", jsonNote, function (err) {
    //                 if (err) throw err;
    //                 console.log("Your note has been deleted!");
    //                 res.json(notes);
    //             });
    //         }
    //     }
});

// listener
app.listen(PORT, () => {
    console.log(`server connected to port ${PORT}!`);
});