const config = require("config");

const username = config.get("database.username");
const message = config.get("auth.message");

const showAuthMessage = (req, res) => {
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
};

module.exports = showAuthMessage;
