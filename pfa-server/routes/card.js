const express = require('express');
const router = express.Router();
const cardController = require('../controllers/card_controller');
const {isLoggedIn} = require('../middlewares/loggedIn');

router.route('/clients')
       .get(isLoggedIn , cardController.getClients);

router.route('/createcard')
       .post(isLoggedIn , cardController.createCard);

router.route('/projects')
       .get(isLoggedIn , cardController.getProjects);

router.route('/uploadimage')
       .post(isLoggedIn , cardController.uploadImage)

router.route('/checktemplate/:templateid')
       .get(isLoggedIn , cardController.checkCreatedTemplate)

router.route('/updatecard/:templateid')
       .post(isLoggedIn , cardController.updateCard)

module.exports = router;