'use strict';
const faker = require('faker')
const express = require('express');
const router = express.Router();
const xid = require('xid-js')
const Message = require('../../db/models/message');
// const publish = require('../../publisher').publish
var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });


//RUTAS
router.post('/', function (req, res) {

    var phoneNumber = req.body.phoneNumber
    var msg = req.body.msg
    var origin = req.body.origin
    var requestId = req.body.requestId || xid.next()

    // SI NO RECIBO UNO DE LOS ATRIBUTOS
    if (!phoneNumber || !msg || !origin ||
        typeof phoneNumber !== 'string' ||
        typeof msg !== 'string' ||
        typeof origin !== 'string' ||
        typeof requestId !== 'string'
    ) {
        res.statusMessage = "Missing attributes";
        res.status(400).end();
    }
    else {
        // Create publish parameters
        var params = {
            Message: msg, /* required */
            PhoneNumber: phoneNumber
        };
        // Create promise and SNS service object
        var publishTextPromise = new AWS.SNS({ endpoint: `http://localstack:4575` }).publish(params).promise();
        // { endpoint: `${process.env.LOCALSTACK_HOSTNAME}:4575` }
        // Handle promise's fulfilled/rejected states
        publishTextPromise.then((data) => {
            console.log(`Message response`, data);
            console.log("MessageID is " + data.MessageId);
            Message.create({
                phoneNumber: phoneNumber,
                requestId: requestId,
                status: 'success',
                channel: 'api',
                last_provider: 'sns',
                origin: origin,
                date: Date()
            })
            res.json({
                "st": "sent",
                "provider": "sns",
                "requestId": requestId,
            })
        }).catch((err) => {
            Message.create({
                phoneNumber: phoneNumber,
                requestId: requestId,
                status: 'failed',
                channel: 'api',
                last_provider: 'sns',
                origin: origin,
                date: Date()
            })
            res.json({
                "st": "error",
                "provider": "sns",
                "requestId": requestId,
            })
            console.error('SOY EL ERROR', err, err.stack);
            res.statusMessage = "Error on SMS providers";
            res.status(500).end();
        });
    }
})

router.get('/seed', function(req,res){
    var status = ['success', 'failed']
    for (let i = 0; i < 100; i++) {
        var fecha = Math.floor(Math.random()*7+1)+'-'+Math.floor(Math.random()*28+1)+'-2019'
        Message.create({
            phoneNumber: faker.phone.phoneNumber(0),
            requestId: Math.floor(Math.random() * 1000),
            status: status[Math.floor(Math.random() * status.length)],
            channel: 'api',
            last_provider: 'sns',
            origin: 'seed',
            date: fecha
        })
    }
    res.send('listo')
})

router.get('/:requestId', function (req, res) {
    var requestId = req.params.requestId
    // return res.send('OK')
    Message.findOne({
        requestId: requestId
    })
        .then((msg) => {
            // SI NO ENCUENTRA EL MENSAJE
            if (msg == null) {
                res.statusMessage = "RequestId doesn't exist";
                res.status(400).end();
            }
            else {
                // SI ENCUENTRA EL MENSAJE
                // res.statusMessage = "Ok";
                res.status(200)
                res.json(msg)
            }
        })

})


module.exports = router;
