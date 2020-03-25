var express = require('express');
var router = express.Router();
let agent = require('../controller/agent');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/** GET agent by id */
router.get('/dashboardMinister/agents/:idAgent', agent.findOne);
/** GET all agents */
router.get('/dashboardMinister/agents', agent.findAll);
/* POST send BroadCast SMS */
router.post('/dashboardMinister/agents/:idAgent/broadcast', agent.sendBroadcast);

module.exports = router;