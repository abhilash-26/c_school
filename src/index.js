// make bluebird default Promise
Promise = require("bluebird"); // eslint-disable-line no-global-assign
const { port, env } = require("./config/vars");
const logger = require("./config/logger");
const socket = require("socket.io");

const app = require("./config/express");
const mongoose = require("./config/mongoose");

const { chatModule } = require("../src/api/routes/v1/chatRoute");

// open mongoose connection
mongoose.connect();

// listen to requests
const server = app.listen(port, () =>
  logger.info(`server started on port ${port} (${env})`)
);

io = socket(server);

io.on("connection", (socket) => {
  console.log("connection established");
  chatModule({ io, socket });
});

/**
 * Exports express
 * @public
 */

module.exports = app;
