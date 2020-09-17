const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const Users = require('./routers/users_router');
const Candy = require('./routers/candy_router');

const server = express();
const PORT = process.env.PORT || 3333;

server.use(helmet());
server.use(cors());
server.use(cookieParser());
server.use(express.json());
server.use(
    session({
        secret: process.env.SECRET || "You guys rock!",
        resave: false,
        saveUninitialized:false,
    })
);

server.use("/api/auth", Users);
server.use("/api/candy", Candy);

server.use("/", (req, res) =>{
    res.json({
        message: "This is the time when I tell you what I want to tell you. You will be a success!!! I don't know what I'm typing, just wanted to type something long so here it is.. Hope you enjoyed!!! Boop! 😇 "
    })
})

server.use((err, req, res, next) =>{
    console.dir(err);
    res.status(500).json({
        message: "Something happened here 🤓 "
    })
})

if(!module.parent){
    server.listen(PORT, () =>{
        console.log(`\n === Server listening on port ${PORT} because I told it to ===\n http://localhost:3333/ `)
    })
}

module.exports = server;