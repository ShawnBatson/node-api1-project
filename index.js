const express = require("express");
const database = require("./database");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "hello, world" });
});

server.get("/users", (req, res) => {
  const users = database.getUsers();

  if (users) {
    return res.json(users);
  } else {
    return res.status(500).json({
      errorMessage: "The users information could not be retrieved.",
    });
  }
});
/////

server.patch("/users/:id/:key", (req, res) => {
  const patchID = req.params.id;
  const patchKey = req.params.key;
  const data = req.body.value;

  const patchedUser = database.patchUser(patchID, patchKey, data);

  console.log(patchKey);

  return res.status(200).json(patchedUser);
});

/////
server.post("/users", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      errorMessage: "Please provide name and bio for the user",
    });
  }

  const newUser = database.createUser({
    name: req.body.name,
    bio: req.body.bio,
  });
  res.status(201).json(newUser);
});

server.patch("/users", (req, res) => {
  if (req.body.name) {
    return res.status(400).json({
      message: "No user to patch",
    });
  }
});

server.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = database.getUserById(userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      message: "The user with the specified ID does not exist.",
    });
  }
});

server.delete("/users/:id", (req, res) => {
  const user = database.getUserById(req.params.id);

  if (user) {
    database.deleteUser(user.id);
    res.status(204).end();
  } else {
    res.status(404).json({
      message: "The user with the specified ID does not exist.",
    });
  }
});

server.listen(3000, () => {
  console.log("server started at port 3000");
});
