const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const messagesController = require('../controllers/messages.controller')


router.get('/general', messagesController.getAllMessages)

router.get('/channel/:channel',messagesController.getChannelMessages)

router.post('/date', messagesController.getMessagesByDate)

// router.get('/status', function (req, res) {
//     if (req.body.from) {
//         Message.find({
//             status: req.body.status,
//             date: {
//                 $gte: req.body.from,
//                 $lt: req.body.to
//             }
//         }).then((msgs) => res.send(msgs))
//     } else {
//         Message.find({status: req.body.status}).then((msgs) => res.send(msgs))
//     }
// })

module.exports = router