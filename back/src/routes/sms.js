'use strict';
const faker = require('faker')
const express = require('express');
const router = express.Router();
const Message = require('../models/message');

const messagesController = require('../controllers/messages.controller')

//RUTAS

router.post('/seed', function (req, res) {
    var status = ['success', 'failed', 'success', 'success', 'success', 'success']
    for (let i = 0; i < 100; i++) {
        // var fecha = Math.floor(Math.random()*7+1)+'-'+Math.floor(Math.random()*28+1)+'-2019'
        Message.create({
            phoneNumber: faker.phone.phoneNumber(0),
            requestId: Math.floor(Math.random() * 1000),
            status: status[Math.floor(Math.random() * status.length)],
            channel: 'api',
            last_provider: 'sns',
            origin: 'seed',
            date: faker.date.between('2019-01-01', '2019-07-11').toISOString()
        })
    }
    res.send('listo')
})

router.post('/', messagesController.insert)
router.get('/:requestId', messagesController.getMessagesSent)

module.exports = router;
