const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messages.controller')

router.post('/', messagesController.getMessages)
router.get('/getchannels', messagesController.getChannelsList)
router.get('/getorigins', messagesController.getOriginsList)

module.exports = router;
