var express = require('express');
var app = express();
var server = require('http').Server(app);
var port = 80;

app.get('/', function(req, res) 
{
    res.send("Hello world");
    console.log("connected.");
});

console.log("listen on port " + port);
server.listen(port);
