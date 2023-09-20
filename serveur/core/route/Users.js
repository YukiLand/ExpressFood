const express = require("express");
const router = express.Router();
const generateToken = require("../utils/generateToken");
const crypto = require("crypto");

// Model User
const UsersEntity = require("../entity/UserSchema");
// const UsersService = require("../service/UsersService");
// let service = new UsersService();

router.get("/test", (req, res) => {
  res.send("Hello World");
});

// @route POST /users/connect
router.post("/login", (req, res) => {
  // Check if the user exists
  UsersEntity.findOne({
    email: req.body.email,
    password: req.body.password,
  })
    .then((user) => {
      if (!user) {
        //if the user with this combination email/password does not exist in the database we return an error
        return res.status(200).json({ message: "User not found" });
      }
      const token = generateToken({
        uuid: user.uuid,
        password: user.password,
      });

      //update the user with the new token
      UsersEntity.updateOne({ uuid: user.uuid }, { token: token })
        .then((user) => {
          return res.status(200).json(user);
        })
        .catch((err) => console.error(err));

      return res.status(200).json(token);
    })
    .catch((err) => console.error(err));
});

// @route POST /signup
router.post("/signup", (req, res) => {
  // Check if the user exists
  UsersEntity.findOne({
    email: req.body.email,
  })
    .then((user) => {
      // We are checking if the user exists in the database
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
      // Create a new user
      let uuid = crypto.randomUUID();
      const newUser = new UsersEntity({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        uuid: uuid,
      });

      newUser
        .save()
        .then((user) => res.json(user))
        .catch((err) => console.error(err));
      return res.status(200).json({ message: "User created" });
    })
    .catch((err) => console.error(err));
});

// @route POST /check/token
router.post("/check/token", (req, res) => {
  // Check if the user exists
  UsersEntity.findOne({
    token: req.body.token,
  })
    .then((user) => {
      if (!user) {
        // if the user with this token does not exist in the database we return an error
        return res.status(200).json({ message: "Token not found" });
      }
      // else we return the token
      return res.status(200).json({ message: "Token valid" });
    })
    .catch((err) => console.error(err));
});

// @route POST /users/get
router.post("/get", (req, res) => {
  // Check if the user exists
  UsersEntity.findOne({
    token: req.body.token,
  })
    .then((user) => {
      if (!user) {
        // if the user with this token does not exist in the database we return an error
        return res.status(200).json({ message: "Token not found" });
      }
      // else we return the user
      let usrModified = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phonenumber: user.phonenumber,
        role: user.role,
      };
      return res.status(200).json(usrModified);
    })
    .catch((err) => console.error(err));
});

// @route POST /users/update
router.post("/update", (req, res) => {
  // Check if the user exists
  UsersEntity.findOne({
    uuid: req.body.uuid,
  })
    .then((user) => {
      if (!user) {
        // if the user with this token does not exist in the database we return an error
        return res.status(200).json({ message: "User not found" });
      }
      // else we update the user
      let userModified = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        role: req.body.role,
        uuid: req.body.uuid,
      };
      UsersEntity.updateOne({ uuid: user.uuid }, userModified);
    })
    .catch((err) => console.error(err));
});

// @route DELETE /users/delete
router.post("/delete", (req, res) => {
  // Check if the user exists
  UsersEntity.findOne({
    token: req.body.token,
  })
    .then((user) => {
      if (!user) {
        // if the user with this token does not exist in the database we return an error
        return res.status(200).json({ tokennotfound: "User not found" });
      }
      // else we delete the user
      UsersEntity.deleteOne({ _id: user._id })

        .then((user) => {
          return res.status(200).json(user);
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
});

// route POST /users
router.post("/all", (req, res) => {
  UsersEntity.find().then((users) => {
    if (!users) {
      return res.status(404).json({ usersnotfound: "Users not found" });
    }
    let arr = [];
    for (let user of users) {
      let usrModified = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phonenumber: user.phonenumber,
        role: user.role,
      };
      arr.push(usrModified);
    }
    return res.status(200).json(arr);
  });
});

//Route POST /all/uuid

router.post("/all/uuid", (req, res) => {
  UsersEntity.find().then((users) => {
    if (!users) {
      return res.status(404).json({ usersnotfound: "Users not found" });
    }
    let arr = [];
    for (let user of users) {
      let usrModified = {
        uuid: user.uuid,
        firstname: user.firstname,
        lastname: user.lastname,
      };
      arr.push(usrModified);
    }
    return res.status(200).json(arr);
  });
});

module.exports = router;
