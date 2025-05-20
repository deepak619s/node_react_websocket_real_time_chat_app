import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

const app = express();

const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "PUT"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User id : - ${socket.id} joined room : ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log("send data", data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected...", socket.id);
  });
});

const Port = 3000;

server.listen(Port, () => {
  console.log(`Connected to Port ${Port}`);
});
