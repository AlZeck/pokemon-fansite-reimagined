const cors = require("cors");
const express = require("express");
const next = require("next");

// parse env variables
require("dotenv").config();

//session and auth dependencies
const session = require("express-session");
const passport = require("passport");
var Strategy = require("passport-local").Strategy;
const uid = require("uid-safe");

// secure passwords
const bcrypt = require("bcrypt");

require("./helpers/db/mongodb.js")();

const Users = require("./models/user_schema");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

// Local Strategy Config
passport.use(
  new Strategy(function (username, password, cb) {
    Users.findOne({ username: username }, function (err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false, "Wrong username or password");
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return cb(err);
        }
        if (!result) {
          // result == false -> wrong password
          return cb(null, false, "Wrong username or password");
        }
        return cb(null, user);
      });
    });
    //  readData,
    //  updateData,
    //  deleteData,
  })
);

// Configure Passport authenticated session persistence.
passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  Users.findById(id, function (err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

(async () => {
  try {
    await app.prepare();
    const server = express();

    // Configure middlewares
    server.use(cors());
    server.use(express.json());

    //Session Management
    const sessionConfig = {
      secret: uid.sync(18),
      cookie: {
        maxAge: 86400 * 1000, // 24 hours in milliseconds
      },
      resave: false,
      saveUninitialized: true,
    };
    server.use(session(sessionConfig));

    server.use(passport.initialize());
    server.use(passport.session());

    server.use(require("./routes/authRoutes"));

    const restrictAccess = (req, res, next) => {
      if (!req.isAuthenticated()) return res.redirect("/login");
      next();
    };
    
    server.use("/profile", restrictAccess);
    server.use("/battle/", restrictAccess);

    // Api handling
    server.use("/api", require("./routes/api"));

    // Next application handling
    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
