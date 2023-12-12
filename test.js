const { exec } = require("child_process");
const { program } = require("commander");
const express = require("express");

program
  .command("start")
  .description("Start the background app")
  .action(() => {
    const configFile = program.opts().config;

    // Read config file and start Express server
    try {
      const app = express();
      // Set up your Express routes and middleware here
      app.get("/", (req, res) => {
        res.send("hello");
      });
      server = app.listen(3000, () => {
        console.log(`Server running on port ${3000}`);
      });

      // Start the app using pm2
      exec(`pm2 start ${__filename} --name=myApp`, (err, stdout, stderr) => {
        if (err) {
          console.error("Error starting app:", err);
          return;
        }
        console.log("App started with pm2.");
      });
    } catch (err) {
      console.error("Error reading or parsing config file:", err);
    }
  });

program
  .command("stop")
  .description("Stop the background app")
  .action(() => {
    exec("pm2 delete myApp", (err, stdout, stderr) => {
      if (err) {
        console.error("Error stopping app:", err);
        return;
      }
      console.log("App stopped.");
    });
  });

program.parse(process.argv);
