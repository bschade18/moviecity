const router = require("express").Router();
let User = require("../models/user.model");

// @route GET /user
// @desc get users
// @access Public
router.get("/", (req, res) => {
  //mongoose command
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;

// @route post /add
// @desc add users
// @access Public
router.post("/add", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({
    name,
    email,
    password
  });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
