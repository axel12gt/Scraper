const mongoose = require("mongoose")
// saves a reference to the schema constructor
const Schema = mongoose.Schema

// creates a new NoteSchema object
const NoteSchema = new Schema({
    // title type of string
    title: String,
    // body type of string
    body: String
})

// Creates the model of the above shema using mongoose
const Note = mongoose.model("Note", NoteSchema)

// Exports the Note model
module.exports = Note