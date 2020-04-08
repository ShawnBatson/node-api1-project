const express = require("express");
const database = require("./database");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "hello, world" });
});

server.listen(3000, () => {
  console.log("server started at port 3000");
});
