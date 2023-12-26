const yargs = require("yargs");
const express = require("express");
const path = require("path");
const fs = require("fs");
const { program } = require("commander");

console.log(yargs.argv.config);

const configPath = yargs.argv.config;

const isValidFile = (p) => {
  const splitPath = p.split("/");
  return splitPath[splitPath.length - 1] === "default.json";
};

if (!configPath) {
  console.error("No config file path provided.");
  process.exit(1);
}

if (!isValidFile(configPath)) {
  console.error("Config file name needs to be default.json");
  process.exit(1);
}

const splitPath = configPath.split("/");
splitPath.splice(splitPath.length - 1, 1);
const dirPath = splitPath.join("/");

process.env["NODE_CONFIG_DIR"] = path.resolve(__dirname, dirPath);
console.log(process.env["NODE_CONFIG_DIR"]);
const config = require("config");
const showAuthMessage = require("./routes/auth");

const port = config.get("server.port");
console.log(port);
const username = config.get("database.username");
const message = config.get("misc.message");

const app = express();
let server;

app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${username}</title>
  </head>
  <body>
      <h1>
        ${message} ${username}
      </h1>
  </body>
  </html>`);
});

app.route("/auth").get(showAuthMessage);

app.listen(port, () => {
  console.log(`Server running on: ${port}`);
});
