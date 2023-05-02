const express = require("express");
const { connection } = require("./db");
const { UserRouter } = require("./router/User.Router");
const { PostRouter } = require("./router/Post.Router");
const { auth } = require("./middleware/auth.middleware");
const cors = require("cors");
const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/users", UserRouter);
app.use(auth);
app.use("/posts", PostRouter);
app.listen(9866, async () => {
  try {
    await connection;
    console.log("Server is running at port 9866");
  } catch (error) {
    console.log(error);
  }
});
