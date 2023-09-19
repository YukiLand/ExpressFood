const UsersEntity = require("../entity/Users");

UserManager = function(app) {

    signup(req, res) {
        // Check if the user exists
    UsersEntity.findOne({
        email: req.body.email,
    })
        .then((user) => {
            // We are checking if the user exists in the database
            if (user) {
                return res.status(404).json({ userexists: "User already exists" });
            }
            // Create a new user
            const newUser = new UsersEntity({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
            });
            newUser
                .save()
                .then((user) => res.json(user))
                .catch((err) => console.log(err));
            return res.status(200).json({usercreated: "User created"})
        })
        .catch((err) => console.log(err));
    }
}