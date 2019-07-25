const express = require("express")
const mongoose = require("mongoose")
const exphbs = require("express-handlebars")

// ports
const PORT = process.env.PORT || 8080
// express intialization
const app = express()

// request body to json parser
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
// sets public as a static folder
app.use(express.static("public"))
// app.use(express.static("public/js"))

// sets handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}) )
app.set("view engine", "handlebars")

// set routes
require("./routes/html-routes.js")(app)
require("./routes/api-routes.js")(app)

// conncects to the mongo db
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";

mongoose.connect(MONGODB_URI);

// Start the server
app.listen(PORT, function(){
    console.log("App started!")
    console.log("Check http://localhost:"+ PORT)
})

