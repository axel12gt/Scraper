// scrape tools
const axios = require("axios")
const cheerio = require("cheerio")

module.exports = app => {
    const db = require("../models")
    // get route for scraping a website
    app.get("/scrape", (req, res) => {
        // gets the body of html with axios
        axios.get("https://www.polygon.com/").then(response => {
            // load into cherio and save with$
            const $ = cheerio.load(response.data)

            // grab stuff
            $("div.c-entry-box--compact").each((i, element) => {
                // save to an empty result object
                const result = {}

                // title and href for each link
                result.title = $(element).find("h2").find("a").text()
                result.link = $(element).find("h2").find("a").attr("href")
                result.author = 
                // result.link = $(this).children("a").attr("href")
                // result.author = $(this).parent("span").find("a").text()
                // console.log(result)
                // Create a new Article using the `result` object
                db.Article.create(result).then(dbArticle => {
                    // View the added result in the console
                    console.log(dbArticle)
                }).catch(err => console.log(err))
            })
        })
        // sends a message to the client
        res.send("Scrape complete")
    })

    // Route for getting all Articles from the db
    app.get("/article", (req,res) => {
        // Grab every document in the Articles collection
        db.Article.find({})
        // If Articles are found send them to the client
        .then(dbArticle => {
            console.log(dbArticle)
            res.json(dbArticle)})
        // If error happens send it back to the client
        .catch(err => res.json(err))
    })

    // Route for grabbing a specific Article by id, populate it with it's note
    app.get("/articles/:id", (req,res) => {
        // Using the id from req.params.id prepare a query that finds the matching one in the db
        db.Article.findOne({ _id: req.params.id})
        // Populate all notes associated with it
        .populate("note")
        // If successfull send back to client
        .then(dbArticle => res.json(dbArticle))
        // If an error occurred, send it to the client
        .catch(err => res.json(err))
    })

    // Route for saving and updating an Article's associated Note
    app.post("/articles/:id", (req, res) => {
        // creates a new note and passes req.body to the id
        db.Note.create(req.body)
            // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            // { new: true } tells the query to return the updated User -- it returns the original by default
            .then(dbNote => db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true }))
            // If the update was successfull update the Article and send it back to the client
            .then(dbArticle => res.json(dbArticle))
            // If an error occurred, send it to the client 
            .catch(err => res.json(err))
    })
}