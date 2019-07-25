const mongoose = require("mongoose")

const Schema = mongoose.Schema
// article schema object
const ArticleSchema = new Schema({
    // title is requried string type
    title: {
        type: String,
        require: true
    },
    // link required string type
    link:{
        type: String,
        required: true
    },
    // Author required string type
    author:{
        type: String,
        required: true
    },
    // note object stores the note id
    // The ref property links the objectId to the note model
    // this populates the article with the associated note
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
})

//Creates the model for the above schema with mongoose
const Article = mongoose.model("Article", ArticleSchema)

// Exports article model
module.exports = Article