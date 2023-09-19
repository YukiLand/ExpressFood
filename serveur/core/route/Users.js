const express = require("express");
const router = express.Router();
const generateToken = require("../utils/generateToken");

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
        return res.status(200).json({ usernotfound: "User not found" });
      }
      const token = generateToken({
        userId: user._id,
        password: user.password,
      });
      console.log("token :>> ", token);

      //update the user with the new token
      UsersEntity.updateOne({ _id: user._id }, { token: token })
        .then((user) => {
          console.log("user updated");
        })
        .catch((err) => console.log(err));

      return res.status(200).json(token);
    })
    .catch((err) => console.log(err));
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
        return res.status(400).json({ userexists: "User already exists" });
      }
      // Create a new user
      const newUser = new UsersEntity({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        uuid: crypto.randomUUID(),
      });
      newUser
        .save()
        .then((user) => res.json(user))
        .catch((err) => console.log(err));
      return res.status(200).json({ usercreated: "User created" });
    })
    .catch((err) => console.log(err));
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
        return res.status(200).json({ tokennotfound: "Token not found" });
      }
      // else we return the token
      return res.status(200).json({ tokenvalid: "Token valid" });
    })
    .catch((err) => console.log(err));
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
        return res.status(200).json({ tokennotfound: "Token not found" });
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
    .catch((err) => console.log(err));
});

// @route POST /users/update
router.post("/update", (req, res) => {
  // Check if the user exists
  UsersEntity.findOne({
    token: req.body.token,
  })
    .then((user) => {
      if (!user) {
        // if the user with this token does not exist in the database we return an error
        return res.status(200).json({ tokennotfound: "User not found" });
      }
      // else we update the user
      switch (req.body.field) {
        case "email":
          UsersEntity.updateOne({ _id: user._id }, { email: req.body.value })
            .then((user) => {
              return res.status(200).json(user);
            })
            .catch((err) => console.log(err));

          break;
        case "password":
          UsersEntity.updateOne({ _id: user._id }, { password: req.body.value })
            .then((user) => {
              console.log("user updated");
              return res.status(200).json(user);
            })
            .catch((err) => console.log(err));
        default:
          break;
      }
    })
    .catch((err) => console.log(err));
});

// @route DELETE /users/delete
router.post("/delete", (req, res) => {
  // Check if the user exists
  console.log("req.body :>> ", req.body);
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
          console.log("user deleted");
          return res.status(200).json(user);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
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

module.exports = router;
