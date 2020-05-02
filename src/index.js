require("dotenv").config();

const express = require("express");
const app2 = require("express")();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const path = require("path");
const fs = require("fs");

const app = express();
const server = require("http").Server(app2);
const io = require("socket.io")(server);

mongoose.connect(process.env.MONGO_URL_DB, {
  useNewUrlParser: true,
});

const directory = "pdfs";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/files", express.static(path.resolve(__dirname, "..", "pdfs")));

app.use(require("./routes"));

io.on("connection", (socket) => {
  socket.on("message", (cmd) => {
    console.log(cmd);
    socket.broadcast.emit("news", { msg: cmd });
  });
});

server.listen(process.env.PORT);
//app.listen(process.env.PORT);

