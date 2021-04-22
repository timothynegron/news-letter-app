const express = require("express")
const bodyParser = require("body-parser")
const https = require("https");

const app = express();
const port = 3000;

app.listen(port, function(req, res){
    console.log("Server is running on port " + port);
})