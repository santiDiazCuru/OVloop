'use strict';

const express = require('express');
const router = express.Router();
const xid = require('xid-js')
const Message = require('../../db/models/message');

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
    else{
        // SI RECIBO TODOS LOS ATRIBUTOS
    
        // LOCALSTACK
        // LOCALSTACK
        // SUPONIENDO QUE TODO ESTA BIEN
        // UNA VEZ QUE VUELVA DE LOCALSTACK LO GUARDO EN LA DB
        Message.create({
            phoneNumber: phoneNumber,
            requestId: requestId,
            status: 'success',
            channel: 'api',
            last_provider: 'sns',
            origin: 'algo',
            date: Date()
        })
    
        // LOCALSTACK
        // LOCALSTACK
    
        // SUCCESS RESPONSE
        res.json({
            "st": "sent",
            "provider": "sns",
            "requestId": requestId,
        })
    }


})

router.get('/:requestId', function (req, res) {
    var requestId = req.params.requestId

    Message.findOne({
        requestId: requestId
    })
    .then((msg)=>{
        // SI NO ENCUENTRA EL MENSAJE
        if(msg == null){
            res.statusMessage = "RequestId doesn't exist";
            res.status(400).end();
        }
        else{
            // SI ENCUENTRA EL MENSAJE
            // res.statusMessage = "Ok";
            res.status(200)
            res.json(msg)
        }
    })

})


module.exports = router;