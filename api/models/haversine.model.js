const db = require('./db');
let posOneList = [];
let posAnyList = [];
/**
 * phi1 and lambda 1 is the coordinates for the first position
 * phi2 and lambda 2 is the coordinates for the second position
 */
const rm = 6371009; //Terrestrial radius in meters
/**
 * Havisine function
 */

let Haversine = () => {}

hav = (theta) => {
        return Math.pow(Math.sin(theta / 2), 2);
    }
    /**
     * Distance function
     */
Haversine.distance = (phi1, phi2, lambda1, lambda2) => {
    phi1 = toRadians(phi1);
    lambda1 = toRadians(lambda1);
    phi2 = toRadians(phi2);
    lambda2 = toRadians(lambda2);
    return 2 * rm * Math.asin(Math.sqrt(
        hav(phi2 - phi1) + Math.cos(phi1) * Math.cos(phi2) * hav(lambda2 - lambda1)
    ));
}

toRadians = (angle) => {
    return angle * Math.PI / 180;
}

positionsCitizen = (citoyenId) => {
    let sql = 'SELECT * FROM positions INNER JOIN citoyens ON positions.citoyenId = citoyens.citoyenId;';
    sql += 'SELECT * FROM positions WHERE citoyenId = ?;';
    return new Promise((resolve, reject) => {
        db.query(sql, [citoyenId], (err, res) => {
            if (err) {
                console.log("error: " + err);
            } else {
                resolve(res);
            }
        });
    });
}

Haversine.getSuspectCitizen = (citoyenId, result) => {
    positionsCitizen(citoyenId)
        .then(data => {
            result(data);
        })
        .catch(err => console.log("Rejection"));
}

module.exports = Haversine;