var express = require("express")
var mongoose = require("mongoose")
var exphbs = require("express-handlebars")

// scrape tools
var axios = require("axios")
var cheerio = require("cheerio")

// all models
var db = require("./models")
// ports
var PORT = process.env.PORT || 8080
// express intialization
var app = express()

// request body to json parser
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
// sets public as a static folder
app.use(express.static("public"))

// sets handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}) )
app.set("view engine", "handlebars")

// set routes
require("./routes/html-routes.js")(app)
require("./routes/api-routes.js")(app)

// conncects to the mongo db
mongoose.connect("mongodb://localhost:27107/scraper", { useNewUrlParser: true})

// Start the server
app.listen(PORT, function(){
    console.log("App started!")
    console.log("Check http://localhost:"+ PORT)
})

//TODO: FIGURE OUT HOW TO CONNECT MODELS