'use strict';
const db = require('./db');

const Cas = (cas) => {
    this.etat = cas.etat;
}

Cas.create = (citoyenId, medecinId, cas, result) => {
    let sql = 'INSERT INTO cas (citoyenId, medecinId, etat) VALUES (?, ?,?)';
    let params = [citoyenId, medecinId, cas.etat];
    db.query(sql, params, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Cas.findById = (citoyenId, result) => {
    let sql = 'SELECT * FROM (cas INNER JOIN citoyens ON cas.citoyenId = citoyens.citoyenId) WHERE cas.citoyenId = ?';
    db.query(sql, [citoyenId], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            if (res.length) {
                console.log('cas found: ', res[0]);
                result(null, res);
            } else {
                result({ kind: "notFound" }, null)
            }
        }
    });
}

Cas.remove = (citoyenId, result) => {
    let sql = 'DELETE FROM cas WHERE casId = ?';
    db.query(sql, [citoyenId], (err, res) => {
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

Cas.getAll = (hopitalId, result) => {
    let sql = 'SELECT * FROM ((cas INNER JOIN medecins ON cas.medecinId = medecins.medecinId) INNER JOIN citoyens ON cas.citoyenId = citoyens.citoyenId) WHERE hopitalId = ?;';
    db.query(sql, [hopitalId], (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Cas.updateById = (citoyenId, cas, result) => {
    let sql = 'UPDATE cas SET etat = ? WHERE citoyenId = ?';
    let params = [cas.etat, citoyenId];
    db.query(sql, params, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
        } else {
            if (res.affectedRows == 0) {
                result({ kind: 'notFound' }, null);
            } else {
                result(null, { citoyenId: citoyenId, cas });
            }
        }
    });
}


module.exports = Cas;