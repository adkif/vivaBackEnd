'use strict';
const express = require('express');
const router = express.Router();

const citizen = require('../controllers/citoyen.controller');
//Citizen One by One
router.route('/:citoyenId')
    .get(citizen.findOne)
    .post(citizen.newPosition)
    .put(citizen.update)
    .delete(citizen.delete);
//Citizen Send some message
router.route('/:citoyenId/messages')
    .post(citizen.sendPublicMessage);
router.route('/:citoyenId/messages/private/:agentId')
    .post(citizen.sendPrivateMessage);

module.exports = router;