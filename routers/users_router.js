const router = require("express").Router();
const Users = require("../models/users_model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
    validation,
    validateUser,
    restrict,
    stats,
  } = require("../middleware/index");

//a get users
router.get("/users", async (req, res, next) => {
  try {
    res.json(await Users.find());
  } catch (err) {
    next(err);
  }
});

//a get users by id
router.get("/users/:id", validateUser, async (req, res, next) => {
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

//a Let's get some new users!
router.post("/register", async (req,res, next) =>{
    try{
        const { username, password } = req.body;
        const user = await Users.findBy({ username }).first()
        if (user){
            return status(409).json({
                message: "User already exists"
            })
        } 
        const new_user = await Users.add({ 
            username, 
            password: await bcrypt.hash(password, process.env.NODE_ENV === "production" ? 10 : 1),
        })
        res.status(201).json({ message: `Welcome to candy land ${username}!`})
    }catch (err) {
            next(err);
        }
})

//a Login
router.post("/login", async (req, res, next) =>{
    try{
        const {username, password} = req.body;
        const user = await Users.findBy({ username }).first()
        if(!user){
            return res.status(400).json({ message: "Invalid Credentials" })
        }
        const pwV = await bcrypt.compare(password, user.password);

        if(!pwV){
            return res.status(400).json({ message: "Invalid Credentials" })
        }
        const payload = { 
            userID: user.id,
            username: user.username,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET || "You guys rock!");
        res.cookie("token", token);
        res.json({
            message: `Welcome ${username}!`,
            token: token,
            id: user.id
        })
    } catch (err) {
        next(err);
    }
})

//Now we can Logout
router.get("/logout", async (req, res, next) => {
    try {
      res.cookie("token", "");
      req.session.destroy((err) => {
        if (err) {
          next(err);
        } else {
          return res.status(204).end();
        }
      });
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
