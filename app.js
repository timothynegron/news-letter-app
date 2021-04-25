// ┌──────────────────────┐
// │   Global Variables   │	
// └──────────────────────┘

const express = require("express")
const bodyParser = require("body-parser")
const https = require("https");
const { response } = require("express");

const app = express();
const port = 3001;


// ┌─────────────────────┐
// │   Server Functions  │	
// └─────────────────────┘

// If using static source like css file and images
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

// Post call, root
app.post("/", function(req, res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    // User 
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    // Mail chimp endpoint
    // Added /list/{list id}
    // Added us{x}
    const url = "region | endpoint | list id";

    // options
    const options = {
        method: "POST",
        auth: "USERNAME:API KEY HERE"
    }

    console.log(response.statusCode)

    // Make https request to store data
    const request = https.request(url, options, function(response){
        
        // Check if request was successful
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        }else{
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function(data){
        //console.log(JSON.parse(data));
    })})

    // Write data to the server
    request.write(jsonData);
    request.end();
});

// Post call at failure.html
app.post("/failure", function(req, res){
    res.redirect("/")
})

app.listen(port, function(req, res){
    console.log("Server is running on port " + port);
});