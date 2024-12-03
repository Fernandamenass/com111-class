const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

// Middleware setup
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  console.log(firstName, lastName, email);
  res.sendFile(__dirname + "/success.html");
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
