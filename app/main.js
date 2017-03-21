"use strict";

var userId = localStorage.getItem("userId") || randomId();
localStorage.setItem("userId", userId);
console.info("User id: " + userId);
var messageCache;

function randomId() {
    return Math.floor(Math.random() * 1e11);
}

var socket = io.connect("http://localhost", {
    "forceNew": true
});

socket.on("messages", function (data) {
    console.info(data);
    messageCache = data;
    render();
});

function render() {
    var html = messageCache.sort(function(a, b){
        return a.ts - b.ts;
    }).map(function (msg, index) {
        return (`
            <form class="message" onsubmit="return likeMessage(messageCache[${index}])">
                <div class="name">
                    ${msg.userName}
                </div>
                <!-- target=_blank => open in new window -->
                <a href=${msg.content.link} class="message" target=_blank>
                    ${msg.content.text}</a>
                <div class="time">${moment(msg.ts).fromNow()}</div>
                <input type="submit"  class="likes-count" value="${msg.likedBy.length}  Likes"></input>
            </form>
        `);
    }).join(" ");

    document.getElementById("messages").innerHTML = html;
}

/* exported addMessage */
function addMessage() {
    var payload = {
        messageId: randomId(),
        userName: document.getElementById("username").value,
        content: {
            text: document.getElementById("message").value,
            link: document.getElementById("linkAddress").value
        },
        likedBy: [],
        ts: Date.now()
    }
    console.log("addMessage");
    socket.emit("new-message", payload);
    return false;
}

/* exported likeMessage */
function likeMessage(message) {
    var index = message.likedBy.indexOf(userId);
    if (index < 0) {
        message.likedBy.push(userId);
    } else {
        message.likedBy.splice(index, 1);
    }

    socket.emit("update-message", message);
    render();
    return false;
}