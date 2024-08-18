const express = require('express');
const router = express.Router();
const templateController = require('../controllers/template_controller');

router.post('/createtemplate', templateController.createTemplate);

router.post('/modifytemplate/:templateId', templateController.modifyTemplate);

router.get('/gettemplate/:templateId' , templateController.getTemplate);
module.exports = router;