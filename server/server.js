const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const UserModel = require("./models/UserModel");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(
  cors({
    original: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(helmet());
// END MIDDLEWARE //

// START ROUTES //

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(cookieParser());
app.use((req, res, next) => {
  if (req.path.startsWith("/server")) {
    req.url = req.url.replace("/server", ""); // strip /server from the path
  }
  next();
});

mongoose.connect(
  "mongodb+srv://svgolovatenko:efX2dsE8YSK2REyf@cluster0.kblhcwc.mongodb.net/User?retryWrites=true&w=majority"
);

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      UserModel.create({ username, email, password: hash })
        .then((user) => res.json(user))
        .catch((err) => res.json(err));
    })
    .catch((err) => console.log(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign(
            { email: user.email, username: user.username },
            "jwt-secret-key",
            { expiresIn: "1d" }
          );

          return res.send(token);
        } else {
          return res.json("Password is incorrect");
        }
      });
    } else {
      res.json("User not exist");
    }
  });
});

app.listen(3001, () => {
  console.log("Server is Running");
});
