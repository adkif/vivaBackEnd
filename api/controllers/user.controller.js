const User = require('../models/user.model');

exports.signup = (req, res) => {
    if (!req.body) {
        res.status(404)
            .json({
                message: "Content can't be empty"
            });
    }
    User.create(req.body, (err, data) => {
        if (err) {
            res.status(500)
                .json({
                    message: "some error occured: " + err
                });
        } else {
            res.json({
                message: "Create account successfully"
            });
        }
    });
}

exports.signin = (req, res) => {
    if (!req.body) {
        res.status(404)
            .json({
                message: "Content can't be empty"
            });
    }
    User.login(req.body, (err, data) => {
        if (err) {
            if (err.kind == "notFound") {
                res.status(404).json({
                    message: 'Not found user'
                });
            } else {
                res.status(500).json({
                    message: "Error retrieving user"
                });
            }
        } else {
            es.json({
                message: "Successfully login"
            });
        }
    });
}