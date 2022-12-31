const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require('./database');
const UserRouter = require("./routes/users");

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/api/users", UserRouter);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
