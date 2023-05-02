const express = require("express");
const PostRouter = express.Router();
const { PostModel } = require("../model/Post.model");

//Post --> data
PostRouter.post("/add", async (req, res) => {
  const data = req.body;
  const post = new PostModel(data);
  await post.save();
  res.json("Post created");
});
//Get --> data
PostRouter.get("/", async (req, res) => {
  try {
    const data = await PostModel.find({ body_id: req.body.body_id });
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});
//Patch --data
PostRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await PostModel.findByIdAndUpdate({ _id: id }, req.body);
    res.json({ msg: `The post with ${id} was successfully Updated` });
  } catch (err) {
    console.log({ err: err.message });
  }
});
//Delete --data
PostRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await PostModel.findByIdAndDelete({ _id: id });
    res.json({ msg: `The post with ${id} was successfully deleted` });
  } catch (err) {
    console.log({ err: err.message });
  }
});

module.exports = { PostRouter };
