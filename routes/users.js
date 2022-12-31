const express = require("express");
const createUser = require("../services/createUser");
const getAllUsers = require("../services/getAllUsers");

const router = express.Router();

router
  .route("/")
  .post(async (req, res) => {
    const name = req.body.username;
    const user = await createUser(name);
    res.json({ username: user.username, _id: user._id });
  })
  .get(async (req, res) => {
    const users = await getAllUsers();
    res.json(users);
  });

module.exports = router;
