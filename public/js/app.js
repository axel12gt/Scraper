// document ready
$(() => {
    console.log("ready")
    // Grab the articles as a json
    $.getJSON("/article", data => {
        console.log("yes")
        // For each one
        for (let i = 0; i < data.length; i++) {
            // Display the apropos information on the page
            $("#articles").append("<p class='article' data-id='" + data[i]._id + "'>" + "<a href=\"" + data[i].link + "\">" + data[i].title + "</a>" + "<br />" + data[i].author + "</p>")
        }
    })

    $(document).on("click", ".article", function () {
        // Empty notes from the note section
        $("#notes").empty()
        //save the id from the p tag
        let thisId = $(this).data("id")
        console.log(thisId)

        // makes an ajax call for the article
        $.ajax({
                method: "GET",
                url: "/articles/" + thisId
            })
            // add the note information to the page
            .then(data => {
                console.log(data)

                $("#notes").append("<h2>" + data.title + "</h2>")
                // An input to enter a new title
                $("#notes").append("<input id='titleInput' name='title' >")
                // A textarea to add a new note body
                $("#notes").append("<textarea id='bodyInput' name='body'></textarea>")
                // A button to submit a new note, with the id of the article saved to it
                $("#notes").append("<button data-id='" + data._id + "' id='save'>Save Note</button>")

                // If there's a note in the article
                if (data.note) {
                    // Place the title of the note in the title input
                    $("#titleInput").val(data.note.title)
                    // Place the body of the note in the body textarea
                    $("#bodyInput").val(data.note.body)
                }
            })
    })

    $(document).on("click", "#scrape", function (event) {
        event.preventDefault()
        console.log("ran")
        $.ajax({
            method: "GET",
            url: "/scrape"
        }).then(
            setTimeout(() => {location.reload()},500)
        )
    })

    // When the save button is clicked
    $(document).on("click", "#save", function () {
        // Grab the id associated with the article from the submit button
        let thisId = $(this).attr("data-id")
        console.log(thisId)
        // Run a post request to change the note, using what's entered in the inputs
        $.ajax({
                method: "POST",
                url: "/articles/" + thisId,
                data: {
                    // Value from title
                    title: $("#titleInput").val(),
                    // Value from text area
                    body: $("#bodyInput").val()
                }
            })
            .then(data => {
                // Log response
                console.log(data)
                // Empty notes section
                $("#notes").empty()
            })
    })

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleInput").val("")
    $("#bodyInput").val("")
})