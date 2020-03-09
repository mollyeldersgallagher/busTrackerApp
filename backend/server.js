require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const path = require("path");

// Setting up port
const connUri = process.env.ATLAS_URI;
let PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());

// for parsing application/json
app.use(express.json());

mongoose.promise = global.Promise;
mongoose.connect(connUri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once("open", () =>
  console.log("MongoDB --  database connection established successfully!")
);
connection.on("error", err => {
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running. " + err
  );
  process.exit();
});

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome to the busTrackerBackend."
  });
});
//=== 3 - INITIALIZE PASSPORT MIDDLEWARE
app.use(passport.initialize());
require("./middlewares/jwt")(passport);

//Configure Route
require("./routes/index")(app);

//=== 5 - START SERVER
app.listen(PORT, () =>
  console.log("Server running on http://localhost:" + PORT + "/")
);
