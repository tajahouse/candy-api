const router = require("express").Router();
const Users = require("../models/users_model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//a get users
router.get("/users", async (req, res, next) => {
  try {
    res.json(await Users.find());
  } catch (err) {
    next(err);
  }
});

//a get users by id
router.get("/users/:id", async (req, res, next) => {
  try {
    res.json(await Users.findById(req.params.id));
    const { user } = req.session;
    console.log(user);
    if (user.id !== Number(req.params.id)) {
      return res.status(401).json({
        message: "User not found",
      });
      next();
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
