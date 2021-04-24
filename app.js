// ┌──────────────────────┐
// │   Global Variables   │	
// └──────────────────────┘

const express = require("express")
const bodyParser = require("body-parser")
const https = require("https");

const app = express();
const port = 3000;


// ┌─────────────────────┐
// │   Server Functions  │	
// └─────────────────────┘

// If using static source like css file and images
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

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

    const options = {
        method: "POST",
        auth: "username:API key here"
    }

    // Make https request to store data
    const request = https.request(url, options, function(response){
        response.on("data", function(data){
        console.log(JSON.parse(data));
    })})

    // Write data to the server
    request.write(jsonData);
    request.end();
});

app.listen(port, function(req, res){
    console.log("Server is running on port " + port);
});