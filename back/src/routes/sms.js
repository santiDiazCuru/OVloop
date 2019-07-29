'use strict';
const faker = require('faker')
const express = require('express');
const router = express.Router();
const Message = require('../dbmodels/message');

const messagesController = require('../controllers/messages.controller')

//RUTAS

router.post('/seed', function (req, res) {
    var status = ['success', 'failed', 'success', 'success', 'success', 'success']
    var channel = ['api','sqs']
    var origin = ['registerProject', 'aleProject', 'mateProject', 'facuProject']

    for (let i = 0; i < 1000; i++) {
        // var fecha = Math.floor(Math.random()*7+1)+'-'+Math.floor(Math.random()*28+1)+'-2019'
        Message.create({
            phoneNumber: faker.phone.phoneNumber(0),
            requestId: Math.floor(Math.random() * 1000),
            status: status[Math.floor(Math.random() * status.length)],
            channel: channel[Math.floor(Math.random() * channel.length)],
            last_provider: 'sns',
            origin: origin[Math.floor(Math.random() * origin.length)],
            date: faker.date.between('2019-01-01', '2019-07-11').toISOString()
        })
    }
    res.send('listo')
})

router.post('/', messagesController.insert)
router.get('/:requestId', messagesController.getSingleMessage)

module.exports = router;
