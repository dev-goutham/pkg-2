const path = require("path");
// process.env["NODE_CONFIG_DIR"] = path.resolve(__dirname, "./");

const yargs = require("yargs");
const fs = require("fs");

// config.util.setModuleDefaults(
//   "config",
//   path.join(__dirname, yargs.argv.config)
// );
process.env["NODE_CONFIG_DIR"] = path.resolve(__dirname, "./");
const config = require("config");

console.log(process.env);
console.log(config.get("message"));
// const p = process.env.NODE_CONFIG;

// fs.readFile(p, { encoding: "utf-8" }, (err, data) => {
//   console.log(err, data);
// });
