const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const port = process.env.PORT || 8080;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

let interval;
io.on("connection", socket => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 3000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const getApiAndEmit = socket => {
  socket.emit("Hello can you hear me?");
  // try {
  //   const res = await axios.get(
  //     "https://api.darksky.net/forecast/b975dcca464db237ae1a6515a667ab62/37.8267,-122.4233"
  //   ); // Getting the data from DarkSky
  //   socket.emit("FromAPI", res.data.currently.temperature);
  // } catch (error) {
  //   console.log("here is the error", error);
  //   console.error(`Error: ${error.code}`);
  // }
};

server.listen(port, () => console.log(`Listening on port ${port}`));
