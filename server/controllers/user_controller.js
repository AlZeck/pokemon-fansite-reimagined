"use strict";

const User = require("../models/user_schema");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const passport = require("passport");

const createData = async (req, res) => {
  if (!(req.body?.username && req.body?.email && req.body?.password)) {
    // the request doesnt provide username, email or password
    let err = { status: "error", info: "Incomplete data" };
    console.error("Error Validating!", err);
    res.status(422).json(err);
  } else if (
    req.body.username !== "CPU" &&
    /^[a-zA-Z0-9_\.]*$/.test(req.body.username) &&
    //username contains only alfanumeric characters _ and .
    (await User.exists({
      $or: [{ username: req.body.username }, { username: req.body.email }],
    }))
  ) {
    let err = { status: "error", info: "Username is not valid" };
    console.error("Error Validating!", err);
    res.status(422).json(err);
  } else if (await User.exists({ email: req.body.email })) {
    let err = { status: "error", info: "Email exists" };
    console.error("Error Validating!", err);
    res.status(422).json(err);
  } else if (
    !(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      req.body.password
    ))
  ) {
    let err = { status: "error", info: "Password is not strong enough" };
    console.error("Error Validating!", err);
    res.status(422).json(err);
  } else {
    // data is successfull
    bcrypt.hash(req.body.password, saltRounds, (err, encrypted) => {
      if (err) {
        console.error(err);
        res.status(500).json({ status: "error", info: err });
      }
      User.create({
        username: req.body.username,
        email: req.body.email,
        password: encrypted,
        avatar: req.body.avatar ?? 1, //defaults to avatar 1
      })
        .then((data) => {
          console.log("New User Created!", data);
          res.status(201).json({ status: "success", info: "success" });
        })
        .catch((err) => {
          if (err.name === "ValidationError") {
            console.error("Error Validating!", err);
            res.status(422).json({ status: "error", info: err });
          } else {
            console.error(err);
            res.status(500).json({ status: "error", info: err });
          }
        });
    });
  }
};

const logInUser = (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ status: "error", info: err });
    }
    if (!user) {
      return res.status(422).json({ status: "error", info: info });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ status: "error", info: err });
      }
      return res.redirect("/");
    });
  })(req, res);
};

const readData = (req, res) => {
  User.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const updateData = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {
    useFindAndModify: false,
    new: true,
  })
    .then((data) => {
      console.log("User updated!");
      res.status(201).json(data);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        console.error("Error Validating!", err);
        res.status(422).json(err);
      } else {
        console.error(err);
        res.status(500).json(err);
      }
    });
};

const deleteData = (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      if (!data) {
        throw new Error("User not available");
      }
      return data.remove();
    })
    .then((data) => {
      console.log("User removed!");
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

module.exports = {
  createData,
  logInUser,
  //  readData,
  //  updateData,
  //  deleteData,
};
