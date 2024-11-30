const express = require("express");
const app = express();
const path = require("path");

let posts = []; // Initialize posts array to store post entries
let currentUser = null; // Placeholder for the currently logged-in user

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Set EJS as the view engine
app.set("view engine", "ejs");

// Enable JSON and URL-encoded form data handling
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to serve index.html on the root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/index.html"));
});

// Login route to set the current user
app.post("/login", (req, res) => {
  currentUser = req.body.name || "Guest"; // Set currentUser, default to "Guest"
  res.redirect("/home");
});

// Render the home.ejs template
app.get("/home", (req, res) => {
  if (!currentUser) {
    return res.redirect("/"); // Redirect to index if not logged in
  }
  res.render("home", { name: currentUser, posts }); // Ensure template name matches the file in views folder
});

// Route to handle new post submissions
app.post("/add-post", (req, res) => {
  const { title, content } = req.body;
  const id = posts.length + 1;
  posts.push({ id, title, content });
  res.redirect("/home");
});

// Route to display an individual post in post.ejs
app.get("/post/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (post) {
    res.render("post", { post });
  } else {
    res.status(404).send("Post not found");
  }
});

// Route to edit a post
app.post("/edit-post/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (post) {
    post.title = req.body.title;
    post.content = req.body.content;
    res.redirect("/home");
  } else {
    res.status(404).send("Post not found");
  }
});

// Route to delete a post
app.post("/delete-post/:id", (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect("/home");
});

// Start the server
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
