const MessageDao = require('../daos/messages.dao');
const MessagesModel = require('../models/messages.models');
var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });
AWS.config.sns = {region: 'us-east-1'};

const xid = require('xid-js');
const generateUuid = () => {
    // generate an uuid
    return xid.next();
};

class MessagesController {
    static async getSingleMessage(req, res) {
        const result = await MessagesModel.getSingleMessage(req.params.requestId)
        if (result == null) res.status(400)
        else res.status(200).send(result)
    }

    static async getChannelsList(req, res) {
        const result = await MessagesModel.getChannelsList()
        res.status(200).send(result)
    }

    static async getOriginsList(req, res) {
        const result = await MessagesModel.getOriginsList()
        res.status(200).send(result)
    }

    static async getMessages(req, res) {
        if (!req.body) res.status(400)
        else {
            const { channel, to, from, status, origin } = req.body
            const result = await MessagesModel.getMessages(channel, origin, status, to, from)
            res.status(200).send(result)
        }
    }

    static async insert(req, res) {
        const { channel, phoneNumber, msg, origin } = req.body;
        const requestId = req.body.requestId || generateUuid()

        // If an attribute is missing return 400
        if (!phoneNumber || !msg || !origin ||
            typeof phoneNumber !== 'string' ||
            typeof msg !== 'string' ||
            typeof origin !== 'string' ||
            typeof channel !== 'string' ||
            typeof requestId !== 'string'
        ) {
            return res.status(400).send('Message info is incomplete');
        }
        else {
            try {

                // Create publish parameters
                var params = {
                    Message: msg, /* required */
                    PhoneNumber: phoneNumber
                };
                // Create promise and SNS service object

                const config = {apiVersion: '2010-03-31'};

                if (process.env.NODE_ENV === 'local') {
                    config.endpoint = `http://localstack:4575`;
                }

                var publishTextPromise = new AWS.SNS(config).publish(params).promise();
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
                await MessagesModel.insert(phoneNumber, msg, origin, channel, requestId)
                res.status(200).send('Message inserted, request Id: ' + requestId);
            } catch (error) {
                console.log('Error in controller | insert', error)
                res.status(500).send('Internal Server Error');
            }
        }
    }
}

module.exports = MessagesController;
