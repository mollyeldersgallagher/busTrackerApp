const auth = require("./auth");
const user = require("./user");
const rtpi = require("./rtpi");
//const trip = require("./trip");

const authenticate = require("../middlewares/authenticate");

module.exports = app => {
  app.use("/auth", auth);
  app.use("/rtpi", rtpi);
  // app.use("/trip", trip);
  app.use("/user", authenticate, user);
};
