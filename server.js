const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const compression = require('compression')

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(compression())

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// routes
app.use(require("./routes/api.js"));

// route for "/" to go to index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
