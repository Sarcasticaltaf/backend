// cd 3RestFullApi
// server satrt ---npm start
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const metthodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(metthodOverride("_method"));

let posts = [
  {
    id: uuidv4(),
    username: "user one",
    content: "This is a post from user one",
  },
  {
    id: uuidv4(),
    username: "user two",
    content: "This is a post from user two",
  },
  {
    id: uuidv4(),
    username: "user three",
    content: "This is a post from user three",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params; // destructuring
  let post = posts.find((post) => post.id === id);
  console.log(post);
  res.render("show.ejs", { post });
});

app.post("/posts", (req, res) => {
  console.log(req.body);
  let { username, content } = req.body;
  const id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params; // destructuring
  const newContent = req.body.content;
  const post = posts.find((post) => post.id === id);
  post.content = newContent;
  console.log(post);
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params; // destructuring
  let post = posts.find((post) => post.id === id);
  res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params; // destructuring
  posts = posts.filter((post) => id !== post.id);
  console.log(posts);
  // res.send("delete success");
  res.redirect("/posts");
});

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
