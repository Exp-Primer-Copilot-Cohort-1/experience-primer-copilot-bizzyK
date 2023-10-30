// Create web server
const express = require("express");
const app = express();
// Create a port
const PORT = 4001;
// Import database
const db = require("./db");
// Import model
const Comment = require("./models/comment");
// Import body-parser
const bodyParser = require("body-parser");
// Use body-parser
app.use(bodyParser.json());
// Create a route
app.get("/", (req, res) => {
  res.send("Welcome to our server!");
});
// Create a route to get comments
app.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json({
      comments: comments,
    });
  } catch (error) {
    console.log(error);
  }
});
// Create a route to get a comment by id
app.get("/comments/:id", async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    res.json({
      comment: comment,
    });
  } catch (error) {
    console.log(error);
  }
});
// Create a route to create a comment
app.post("/comments", async (req, res) => {
  try {
    const comment = await Comment.create({
      name: req.body.name,
      message: req.body.message,
    });
    res.json({
      comment: comment,
    });
  } catch (error) {
    console.log(error);
  }
});
// Create a route to update a comment
app.put("/comments/:id", async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    const updatedComment = await comment.update({
      name: req.body.name,
      message: req.body.message,
    });
    res.json({
      comment: updatedComment,
    });
  } catch (error) {
    console.log(error);
  }
});
// Create a route to delete a comment
app.delete("/comments/:id", async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    await comment.destroy();
    res.json({
      message: "Comment deleted",
    });
  } catch (error) {
    console.log(error);
  }
});
// Listen on port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});