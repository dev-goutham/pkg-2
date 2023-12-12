const yargs = require("yargs");
const express = require("express");
const path = require("path");
const fs = require("fs");
const { program } = require("commander");

console.log(yargs.argv.config);

let port;
let message;
let username;

if (yargs.argv.config) {
  const configFilePath = yargs.argv.config;
  console.log(`Config file path: ${configFilePath}`);
  const absoluteConfigPath = path.resolve(configFilePath);
  fs.readFile(absoluteConfigPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading config file:", err);
      process.exit(1);
    }

    try {
      const config = JSON.parse(data);

      port = config.server.port;
      //   const databaseName = config.database.databaseName;
      message = config.misc.message;
      username = config.database.username;

      console.log(`Server Port: ${port}`);
      //   console.log(`Database Name: ${databaseName}`);
    } catch (parseError) {
      console.error("Error parsing config file:", parseError);
    }
  });
} else {
  console.error("No config file path provided.");
  process.exit(1);
}

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

program.requiredOption("-c, --config <path>", "Path to the config file");

program
  .command("start")
  .description("Start the background app")
  .action(() => {
    console.log("App started in the background.");
    server = app.listen(port, () => {
      console.log(`Server running on: ${server.address().port}`);
    });
  });

program
  .command("stop")
  .description("Stop the background app")
  .action(() => {
    server.close(() => {
      console.log("Server stopped");
      process.exit(0);
    });
  });

program.parse(process.argv);
