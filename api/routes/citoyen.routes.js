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
//Citizen get questions
router.route('/:citoyenId/questions')
    .get(citizen.getAllQuestion);
//Citizen response question one by one
router.route('/:citoyenId/questions/:questionId')
    .post(citizen.makeTest);

module.exports = router;