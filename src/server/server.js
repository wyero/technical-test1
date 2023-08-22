const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const PORT = 8000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  transports: ["websocket"],
});

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

io.on("connection", (socket) => {
  console.log("berhasil connect");
  socket.on("message", (message) => {
    io.emit("message", message);
  });
  socket.on("disconnect", () => {
    console.log("disconnect");
  });
});

server.listen(PORT, () => {
  console.log("server running");
});
