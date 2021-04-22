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
    console.log(`${firstName} ${lastName} ${email}`);
})

app.listen(port, function(req, res){
    console.log("Server is running on port " + port);
})