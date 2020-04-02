'use strict';
const db = require('./db');

const Resultat = () => {}
Resultat.create = (citoyenId, questionId, res, result) => {
    let sql = 'INSERT INTO resultats (citoyenId, questionId, reponse) VALUES (?, ?, ?)';
    let params = [citoyenId, questionId, res.reponse];
    db.query(sql, params, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}
Resultat.removeAll = (result) => {
    let sql = 'DELETE FROM resultats';
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
Resultat.getAll = result => {
    let sql = 'SELECT * FROM resultats';
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

module.exports = Resultat;