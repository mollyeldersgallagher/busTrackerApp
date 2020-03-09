const auth = require("./auth");
const user = require("./user");
const rtpi = require("./rtpi");

const authenticate = require("../middlewares/authenticate");

module.exports = app => {
  app.use("/api/auth", auth);
  app.use("/api/rtpi", rtpi);
  app.use("/api/user", authenticate, user);
};
