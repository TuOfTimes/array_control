var socket = io();

// socket.on("led", function(data) {});

function showValue(newValue) {
    console.log(newValue);
    socket.emit("led", { value: newValue });
}
