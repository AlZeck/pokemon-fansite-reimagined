const express = require("express");

const {
  createData,
  logInUser,
} = require("../controllers/user_controller");

const router = express.Router();

router.post("/login", logInUser);

router.post("/signup", createData);

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

module.exports = router;
