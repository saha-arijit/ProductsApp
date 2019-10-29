const Note = require('../models/note.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Note
    const note = new Note({
        title: req.body.title || "Untitled Note", 
        content: req.body.content
    });

    // Save Note in the database
    note.save()
    .then(data => {
        // res.status(201).send(data);
        res.status(201).send({
        	status:201,
        	message : "Inserted successfully."
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};


// ***************************************************

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {

	Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });

};

// Find a single note with a noteId
exports.findOne = (req, res) => {

    Note.findById(req.params.noteId)
    .then( note => {
        if(!note){
            return res.status(404).send({
                message : "Not found note with node id : " + req.params.noteId
            })
        }
        res.status(200).send({
            message : "Found Note with node id : " + req.params.noteId,
            "data" : note
        })
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message : "Not found note with node id : " + req.params.noteId
            })             
        }

        return res.status(500).send({
            message : "Error in finding note with node id : " + req.params.noteId
        })
    })

};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

    

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note){
            return res.status(404).send({
                message : "Not able to find note with given id : "+ req.params.noteId
            })
        }
        res.status(200).send({
            message : "Note deleted successfully."
        })
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};