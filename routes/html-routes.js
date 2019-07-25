const db = require("../models")
module.exports = app => {
    

app.get("/", (req,res) => {
    // Grab every document in the Articles collection
    db.Article.find({})
    // If Articles are found send them to the client
    .then(dbArticle => res.render("index"))
    // If error happens send it back to the client
    .catch(err => res.json(err))
})

}