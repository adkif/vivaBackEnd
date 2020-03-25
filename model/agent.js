const db = require('./db');
const notification = require('./sendSms');
const config = require('../config/twilioConfig');

const Agent = (agent) => {
    this.id = agent.id;
    this.name = agent.name;
    this.lastname = agent.lastname;
    this.contact = agent.contact;
}

/* Create new agent of ministrie */
Agent.create = (agent, result) => {
    let sql = 'INSERT INTO agents SET ?';
    let params = [agent];
    db.query(sql, params, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

/** Retreive agent with id */
Agent.findById = (idAgent, result) => {
    let sql = 'SELECT * FROM agents WHERE idAgent = ?';
    db.query(sql, [idAgent], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

/** Send bulk sms to all contacts */
Agent.sendBulkSms = (idAgent, msg, arrayContacts, result) => {
        let sql = 'INSERT INTO messages SET ?';
        let type = 'smsBulk';
        let contacts = [];
        contacts = arrayContacts;
        for (let contact in contacts) {
            notification.messages
                .create({
                    body: msg,
                    from: config.TWILIO_NUMBER,
                    to: contact
                })
                .then((message) => console.log(message.sid));
        }
        db.query(sql, [msg, idAgent, type], (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }
    /** Send simply web message privatly*/
Agent.sendMessage = (idAgent, idContact, msg, result) => {
    let sql = 'INSERT INTO messages SET ?';
    let type = 'private';
    db.query(sql, [msg, idAgent, type, idContact], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

/** Post message on the public chat */

Agent.postMessage = (idAgent, msg, result) => {
    let sql = 'INSERT INTO messages SET ?';
    let type = 'public';
    db.query(sql, [msg, idAgent, type], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Agent.remove = (idAgent, result) => {
        let sql = 'DELETE FROM agents WHERE id = ?';
        db.query(sql, [idAgent], (err, res) => {
            if (err) {
                result(err, null);
            } else {
                if (res.affectedRows == 0) {
                    result({ kind: 'not_found' }, null);
                } else {
                    result(null, res);
                }
            }
        });
    }
    /* Define the sql query to retrieve all clients in database */
Agent.findAll = result => {
    let sql = 'SELECT * FROM agents';
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Agent.updateById = (idAgent, agent, result) => {
    let sql = 'UPDATE agents SET name = ?, address = ?, mail = ? WHERE id = ?';
    let params = [agent.name, agent.address, agent.mail, idAgent];
    db.query(sql, params, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            if (res.affectedRows == 0) {
                result({ kind: 'not_found' }, null);
            } else {
                result(null, { idAgent: idAgent, agent });
            }
        }
    });
}

module.exports = Agent;