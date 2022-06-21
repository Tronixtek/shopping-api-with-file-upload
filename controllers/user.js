const User = require('../models/user');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save().then(() => {
                res.status(201).json("User saved Successfully");
            }).catch((error) => {
                res.status(500).json("an error occured. try again")
            })

        }
    ).catch((error) => {
        res.status(500).json({ error: error.message });
    })

}

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(
        (user) => {
            if (!user) {
                res.status(400).json({ message: "User does not exist" })
            }
            bcrypt.compare(req.body.password, user.password).then(
                (valid) => {
                    if (!valid) {
                        return res.status(400).json({
                            message: "Password Incorrect"
                        });
                    }
                    const token = jwt.sign({ userId: user._id }, 'RANDOM_SECRET_NUMBER', { expiresIn: "24h" });
                    res.status(200).json({
                        userId: user._id,
                        token: token
                    });
                }
            ).catch((error) => {
                res.status(200).json({
                    error: error
                })
            })
        }
    ).catch((error) => {
        res.status(500).json({
            error: error
        })
    })

}