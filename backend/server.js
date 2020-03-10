require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const path = require("path");

// Setting up port
const uri = process.env.ATLAS_URI;
let PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());

//mongoose.promise = global.Promise;
mongoose.connect(String(uri), {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
//console.log(uri);

const connection = mongoose.connection;
connection.once("open", () =>
  console.log("MongoDB Atlas database connected successfully!")
);
// connection.on("error", err => {
//   console.log("MongoDB connection error" + err);
//   process.exit();
// });

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome to the busTrackerBackend."
  });
});
// INITIALIZE PASSPORT MIDDLEWARE
app.use(passport.initialize());
require("./middlewares/jwt")(passport);

//Configure Route
require("./routes/index")(app);

//server running
app.listen(PORT, () => console.log("Server running on port" + PORT));
