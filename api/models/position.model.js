'use strict';
const db = require('./db');

const Position = (position) => {
    this.longitude = position.longitude;
    this.latitude = position.latitude;
}
Position.create = (citoyenId, position, result) => {
    let sql = 'INSERT INTO positions (longitude, latitude, citoyenId) VALUES (?, ?, ?)';
    let params = [position.longitude, position.latitude, citoyenId];
    db.query(sql, params, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}
Position.removeAll = (result) => {
    let sql = 'DELETE FROM positions';
    db.query(sql, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            if (res.affectedRows == 0) {
                result({ kind: 'notFound' }, null);
            } else {
                result(null, res);
            }
        }
    });
}
Position.getAll = result => {
    let sql = 'SELECT * FROM positions';
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Position.getAllForOne = (citoyenId, result) => {
    let sql = 'SELECT * FROM positions WHERE citoyenId = ?';
    db.query(sql, [citoyenId], (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

module.exports = Position;