const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const SerialPort = require("serialport");

const serialPort = new SerialPort("/dev/ttyACM0", { baudRate: 115200 });
server.listen(8080);

app.use(express.static("public"));

var index = 0;

io.sockets.on("connection", function(socket) {
    socket.on("led", function(data) {
        index = data.value;

        var buf = new Buffer.alloc(1);
        buf.writeUInt8(index, 0);
        serialPort.write(buf);
    });
});

console.log(
    "Web Server Started go to 'http://localhost:8080' in your Browser."
);
