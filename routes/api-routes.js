// scrape tools
var axios = require("axios")
var cheerio = require("cheerio")

module.exports = app => {
    var db = require("../models")
// get route for scraping a website
app.get("/scrape", function(req,res){
    // gets the body of html with axios
    axios.get("https://www.polygon.com/").then(function(res){
        // load into cherio and save with$
        var $ = cheerio.load(res.data)

        // grab stuff
        $(".c-entry-box--compact__title").each((i,element)=>{
            // save to an empty result object
            var result = {}

            // title and href for each link
            result.title = $(this).children("a").text()
            result.link = $(this).children("a").attr("href")
            // Create a new Article using the `result` object
            db.Article.create(result).then(dbArticle =>{
                // View the added result in the console
                console.log(dbArticle)
            }).catch(err => console.log(err))
        })
    })
})
}