const db = require("../models")
module.exports = app => {
    

app.get("/", (req,res) => {
    
    // If Articles are found send them to the client
    res.render("index")
    // If error happens send it back to the client
    
})

}