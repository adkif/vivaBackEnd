'use strict';

const Agent = require('../model/agent');

exports.findOne = (req, res) => {
    Agent.findById(req.params.idAgent, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
}

exports.findAll = (req, res) => {
    Agent.findAll((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
}

exports.sendBroadcast = (req, res) => {
    Agent.sendBulkSms(req.params.idAgent, req.body.msg, req.body.contacts, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
}

exports.sendMessage = (req, res) => {
    Agent.sendMessage(req.params.idAgent, req.body.id, req.body.msg, idContact, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
}