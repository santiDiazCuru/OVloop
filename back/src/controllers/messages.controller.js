const MessageDao = require('../daos/messages.dao');
const MessagesModel = require('../models/messages.models');
const xid = require('xid-js');
const possibleChannels = require('../dbmodels/message').findChannels()


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
