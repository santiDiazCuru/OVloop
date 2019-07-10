'use strict';
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
        // res.status(400)
        // res.send({
        //     description: 'Missing attributes'
        // })
        // res.sendStatus(400)

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
        var publishTextPromise = new AWS.SNS({ endpoint: `http://localshost:4575` }).publish(params).promise();
        // { endpoint: `${process.env.LOCALSTACK_HOSTNAME}:4575` }
        // Handle promise's fulfilled/rejected states
        publishTextPromise.then((data) => {
            console.log("Message ${params.Message} send sent to the topic ${params.TopicArn}");
            console.log("MessageID is " + data.MessageId);
        }).catch((err) => {
            console.error('SOY EL ERROR', err, err.stack);
        });
        // SI RECIBO TODOS LOS ATRIBUTOS

        // LOCALSTACK
        // LOCALSTACK
        // SUPONIENDO QUE TODO ESTA BIEN
        // UNA VEZ QUE VUELVA DE LOCALSTACK LO GUARDO EN LA DB
        // publish(msg, phoneNumber)
        //     .then((answ) => {
        //         console.log('hola soy answer:', answ)
        //         Message.create({
        //             phoneNumber: phoneNumber,
        //             requestId: answ.RequestId,
        //             status: 'success',
        //             channel: 'api',
        //             last_provider: 'sns',
        //             origin: 'algo',
        //             date: Date()
        //         })
        //         res.json({
        //             "st": "sent",
        //             "provider": "sns",
        //             "requestId": answ.RequestId,
        //         })
        //     }
        //     )

        // LOCALSTACK
        // LOCALSTACK

        // SUCCESS RESPONSE
    }

})

router.get('/:requestId', function (req, res) {
    var requestId = req.params.requestId

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