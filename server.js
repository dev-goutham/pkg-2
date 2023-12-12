const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

let server;

const start = () => {
  const port = 3000;
  server = app.listen(port, () => {
    console.log(`Server running on: ${server.address().port}`);
  });
};

const stop = () => {
  if (server) {
    server.stop(() => {
      console.log("Server stopped");
    });
  }
};

module.exports = {
  start,
  stop,
};
