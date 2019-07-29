'use strict';
const faker = require('faker')
const express = require('express');
const router = express.Router();
const Message = require('../dbmodels/message');
const originList = require('../dbmodels/originList')
const messagesController = require('../controllers/messages.controller')

//RUTAS

router.post('/seed', function (req, res) {
    var status = ['success', 'failed', 'success', 'success', 'success', 'success', 'failed']
    var channel = ['api', 'api', 'api', 'sqs', 'sqs', 'sqs', 'sqs']
    var origin = ['registerProject', 'registerProject', 'aleProject', 'mateProject', 'mateProject', 'mateProject', 'mateProject', 'facuProject', 'facuProject', 'facuProject', 'facuProject', 'facuProject', 'facuProject', 'facuProject', 'facuProject', 'facuProject']
    var origins = ['registerProject', 'aleProject', 'mateProject', 'facuProject']
    for (let i = 0; i < 500; i++) {
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
    for (let i = 0; i < 500; i++) {
        // var fecha = Math.floor(Math.random()*7+1)+'-'+Math.floor(Math.random()*28+1)+'-2019'
        Message.create({
            phoneNumber: faker.phone.phoneNumber(0),
            requestId: Math.floor(Math.random() * 1000),
            status: status[Math.floor(Math.random() * status.length)],
            channel: channel[Math.floor(Math.random() * channel.length)],
            last_provider: 'sns',
            origin: origin[Math.floor(Math.random() * origin.length)],
            date: faker.date.between('2019-01-01', '2019-02-11').toISOString()
        })
    }
    for (let i = 0; i < 500; i++) {
        // var fecha = Math.floor(Math.random()*7+1)+'-'+Math.floor(Math.random()*28+1)+'-2019'
        Message.create({
            phoneNumber: faker.phone.phoneNumber(0),
            requestId: Math.floor(Math.random() * 1000),
            status: status[Math.floor(Math.random() * status.length)],
            channel: channel[Math.floor(Math.random() * channel.length)],
            last_provider: 'sns',
            origin: origin[Math.floor(Math.random() * origin.length)],
            date: faker.date.between('2019-03-01', '2019-05-11').toISOString()
        })
    }
    for (let i = 0; i < 500; i++) {
        // var fecha = Math.floor(Math.random()*7+1)+'-'+Math.floor(Math.random()*28+1)+'-2019'
        Message.create({
            phoneNumber: faker.phone.phoneNumber(0),
            requestId: Math.floor(Math.random() * 1000),
            status: status[Math.floor(Math.random() * status.length)],
            channel: channel[Math.floor(Math.random() * channel.length)],
            last_provider: 'sns',
            origin: origin[Math.floor(Math.random() * origin.length)],
            date: faker.date.between('2019-03-01', '2019-05-11').toISOString()
        })
    }
    for (let i = 0; i < 500; i++) {
        // var fecha = Math.floor(Math.random()*7+1)+'-'+Math.floor(Math.random()*28+1)+'-2019'
        Message.create({
            phoneNumber: faker.phone.phoneNumber(0),
            requestId: Math.floor(Math.random() * 1000),
            status: status[Math.floor(Math.random() * status.length)],
            channel: channel[Math.floor(Math.random() * channel.length)],
            last_provider: 'sns',
            origin: origin[Math.floor(Math.random() * origin.length)],
            date: faker.date.between('2019-05-11', '2019-06-11').toISOString()
        })
    }
    for (let i = 0; i < 500; i++) {
        // var fecha = Math.floor(Math.random()*7+1)+'-'+Math.floor(Math.random()*28+1)+'-2019'
        Message.create({
            phoneNumber: faker.phone.phoneNumber(0),
            requestId: Math.floor(Math.random() * 1000),
            status: status[Math.floor(Math.random() * status.length)],
            channel: channel[Math.floor(Math.random() * channel.length)],
            last_provider: 'sns',
            origin: origin[Math.floor(Math.random() * origin.length)],
            date: faker.date.between('2019-06-11', '2019-08-01').toISOString()
        })
    }
    for (let i = 0; i < 500; i++) {
        // var fecha = Math.floor(Math.random()*7+1)+'-'+Math.floor(Math.random()*28+1)+'-2019'
        Message.create({
            phoneNumber: faker.phone.phoneNumber(0),
            requestId: Math.floor(Math.random() * 1000),
            status: status[Math.floor(Math.random() * status.length)],
            channel: channel[Math.floor(Math.random() * channel.length)],
            last_provider: 'sns',
            origin: origin[Math.floor(Math.random() * origin.length)],
            date: faker.date.between('2019-07-04', '2019-08-01').toISOString()
        })
    }
    for (let i = 0; i < origins.length; i++) {
        originList.create({ origin: origins[i] })
    }
    res.send('listo')
})

router.post('/', messagesController.insert)
router.get('/:requestId', messagesController.getSingleMessage)

module.exports = router;
