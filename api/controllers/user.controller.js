const User = require('../models/user.model');
const Citizen = require('../models/citoyen.model');
const Adresse = require('../models/adresse.model');
const Contact = require('../models/contact.model');

exports.signup = (req, res) => {
    if (!req.body) {
        res.status(404)
            .json({
                message: "Content can't be empty"
            });
    }
    User.create(req.body, (err, user) => {
        if (err) {
            res.status(500)
                .json({
                    message: "some error occured: " + err
                });
        } else {
            Citizen.create(user.insertId, req.body, (err, citizen) => {
                if (err) res.status(500)
                    .json({
                        message: "some error occured: " + err
                    });
            });
            Adresse.create(user.insertId, req.body, (err, adress) => {
                if (err) res.status(500)
                    .json({
                        message: "some error occured: " + err
                    });

            });
            Contact.create(user.insertId, req.body, (err, contact) => {
                if (err) res.status(500)
                    .json({
                        message: "some error occured: " + err
                    });
            });
            res.status(200).json({
                message: "Created successfully"
            })
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
            res.json({
                message: "Successfully login"
            });
        }
    });
}