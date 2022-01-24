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
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

//functions
function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

// function createNote(body, notesArray) {
//     const note = body;
//     notesArray.push(note);
    
//     fs.writeFileSync(
//         path.join(__dirname, "./db/notes.json"),
//         JSON.stringify({ notes:notesArray }, null, 2)
//     );
//     return note;
// };

//The gets start
// route type to reference the data { notes }
app.get('/api/notes', (req, res) => {
    const dataNotes = fs.readFileSync(
        path.join(__dirname, "./db/notes.json"), "utf-8");
        const notesParse = JSON.parse(dataNotes);
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
//gets end



//the posts start
// write new note to the notes.json file
app.post('/api/notes', (req, res) => {
    res.send("this is a post!")
    console.log("this POST");
    // set id based on what the next index of the array will be
    // const dataNotes = fs.readFileSync(
    //     path.join(__dirname, "./db/notes.json"), "utf-8");
        

    //     req.body.id = notes.length.toString();

    // if (!validateNote(req.body)) {
    //     res.status(400).send('The note is not properly formatted.');
    // } else {
    //     const note = createNote(req.body, notes);
    //     res.json(note);
    // }
});
//posts end







//pauls nf delete code. need to work on this and solve the issue.
// app.delete("/api/notes/:id", function (req, res) {
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
// });

// listener
app.listen(PORT, () => {
    console.log(`server connected to port ${PORT}!`);
});