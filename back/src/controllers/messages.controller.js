const MessageDao = require('../daos/messages.dao');

var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });
const xid = require('xid-js');

const generateUuid = () => {
    // generate an uuid
    return xid.next();
};

class MessagesController {
    static getMessagesSent(req, res) {
        try {
            MessageDao.getMessagesSent(req.params.requestId)
                .then((msg) => {
                    // console.log(msg)
                    // SI ENCUENTRA EL MENSAJE
                    res.statusMessage = "Ok";
                    res.status(200)
                    res.json(msg)
                })

        } catch (error) {
            res.statusMessage = "Request Id doesn't exist";
            res.status(400).end();
        }
    }

    static getChannelsList(req, res) {
        MessageDao.getChannelsList()
            .then((channels) => res.json(channels))
    }
    static getOriginsList(req, res) {
        MessageDao.getOriginsList()
            .then((origins) => res.json(origins))
    }

    static getMessages(req, res) {
        var channel = req.body.channel
        var to = req.body.to
        var from = req.body.from
        var origin = req.body.origin
        var query = {}

        if (to && from) {
            if (channel) {
                query = {
                    date: {
                        $gte: from,
                        $lt: to
                    },
                    channel: channel
                }
            }
            else if (origin) {
                query = {
                    date: {
                        $gte: from,
                        $lt: to
                    },
                    origin: origin
                }
            }
            else {
                query = {
                    date: {
                        $gte: from,
                        $lt: to
                    },
                }
            }
        } else {
            if (channel) {
                query = {
                    channel: channel
                }
            }
            else if (origin) {
                query = {
                    origin: origin
                }
            }
            else {
                query = {
                }
            }
        }
        MessageDao.getMessages(query)
            .then((msgs) => {
                res.json(msgs)
            })
    }

    static insert(req, res) {
        var channel = req.body.channel
        var phoneNumber = req.body.phoneNumber
        var msg = req.body.msg
        var origin = req.body.origin
        var requestId = req.body.requestId || generateUuid()

        // SI NO RECIBO UNO DE LOS ATRIBUTOS
        if (!phoneNumber || !msg || !origin ||
            typeof phoneNumber !== 'string' ||
            typeof msg !== 'string' ||
            typeof origin !== 'string' ||
            typeof channel !== 'string' ||
            typeof requestId !== 'string'
        ) {
            res.statusMessage = "Missing attributes";
            res.status(400).end();
            return
        }
        else {
            try {
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
                    var fecha = new Date()
                    var newMessage = {
                        phoneNumber: phoneNumber,
                        requestId: requestId,
                        status: 'success',
                        channel: channel,
                        last_provider: 'sns',
                        origin: origin,
                        date: fecha.toISOString()
                    }

                    MessageDao.insert(newMessage)
                        .then((response) => {
                            res.json({
                                "st": "sent",
                                "provider": "sns",
                                "requestId": requestId,
                            })
                        })
                })
            } catch (error) {
                var fecha = new Date()
                var newMessage = {
                    phoneNumber: phoneNumber,
                    requestId: requestId,
                    status: 'failed',
                    channel: 'api',
                    last_provider: 'sns',
                    origin: origin,
                    date: fecha.toISOString()
                }

                MessageDao.insert(newMessage)
                    .then((response) => {
                        res.json({
                            "st": "error",
                            "provider": "sns",
                            "requestId": requestId,
                        })
                    })
                console.error('SOY EL ERROR', error, error.stack);
                res.statusMessage = "Error on SMS providers";
                res.status(500).end();
            }
        }
    }
}

module.exports = MessagesController;
