// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const database = require("./db/db.json")
const cuid = require('cuid')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

// ROUTES
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// shows all saved notes
app.get('/api/notes', (req, res) => res.json(database));


// read db.json for saved notes and push new note into file
app.post('/api/notes', (req, res) => {

    let newNote = req.body;

    newNote.id = cuid()
    
    database.push(newNote);

    res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
    const myID = req.params.id;

    for (let i = 0; i < database.length; i++) {
        if (database[i].id === myID) {
            database.splice([i], 1)
        }
    }
    res.end();
  });


// Listener
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
})