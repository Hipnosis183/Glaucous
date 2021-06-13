var express = require('express');
var router = express.Router();

var GameController = require('../controllers/game');
var DeveloperController = require('../controllers/developer');
var PlatformController = require('../controllers/platform');

/* GET home page. */
router.get('/', function(req, res, next) {});

router.post('/createGame', GameController.createGame);
router.post('/createDeveloper', DeveloperController.createDeveloper);
router.get('/getDevelopers', DeveloperController.getDevelopers);
router.post('/createPlatform', PlatformController.createPlatform);
router.get('/getPlatforms', PlatformController.getPlatforms);

module.exports = router;
