"use strict";

var socket = io.connect("http://localhost", {
    "forceNew": true
});
socket.on("messages", function (data) {
    console.info(data);
    var html = data.map(function(d){
        return (`
            <div class='name'>
                ${d.userName}
            </div>
            <!-- target=_blank => open in new window -->
            <a href=${d.content.link} class='message' target=_blank>
                ${d.content.text}</a>
        `);
    }).join(" ");

    document.getElementById("messages").innerHTML = html;
});

/* exported addMessage */
function addMessage() {
    var payload = 
    {
        userName : document.getElementById("username").value, 
        content : {
            text : document.getElementById("message").value, 
            link : document.getElementById("linkAddress").value
        },
        ts: Date.now()
    }
    console.log("addMessage");
    socket.emit("new-message", payload);
    return false;
}