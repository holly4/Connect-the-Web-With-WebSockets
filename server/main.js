var express = require("express");
var app = express();
var server = require("http").Server(app);
var port = 80;
var io = require("socket.io")(server);


//app.get("/", function (req, res) {
//    var date = new Date();
//    res.send("Hello at " + date.toISOString());
//    console.log("connected to express.");
//});

app.use(express.static('app'));

io.on("connection", function (socket) {
    console.log("connected to socket.io.");
    socket.emit("messages", ["Hello", "Hi there", "How are you?", "Todd Starnes is a fat fuck"])
});

console.log("listen on port " + port);
server.listen(port);