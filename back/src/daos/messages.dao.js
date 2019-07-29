const Message = require('../dbmodels/message');
const OriginList = require('../dbmodels/originList');

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });

class MessagesDao {
    static getSingleMessage(requestId) {
        return Message.findOne({
            requestId: requestId
        })
            .then((message) => {
                return message;
            })
    }
    static getMessages(query) {
        return Message.find(query)
            .then((msgs) => {
                return msgs;
            })
    }

    static async getChannelsList() {
        const Channels = await Message.findChannels()
        return Channels;
    }
    static getOriginsList() {
        return OriginList.find({})
            .then((origins) => { return origins });
    }
    static insert(message) {
        // Create publish parameters
        const params = {
            Message: message.msg, /* required */
            PhoneNumber: message.phoneNumber
        };
        // Create promise and SNS service object
        const publishTextPromise = new AWS.SNS({ endpoint: `http://localstack:4575` }).publish(params).promise()

        try {
            // Handle promise's fulfilled/rejected states
            publishTextPromise
                .then((data) => {
                    console.log('SNS message Id response:' + data.MessageId)
                    return OriginList.findOne({ origin: message.origin })
                        .then((origin) => {
                            if (origin == null) OriginList.create({ origin: message.origin })
                        })
                        .then((msg) => {
                            Message.create({ ...message, ...{ status: 'success' } })
                                .then(message => {
                                    console.log(message)
                                    return message
                                })
                        })
                })
        } catch (error) {
            console.log('error with SNS service', error)
            Message.create({ ...message, ...{ status: 'failed' } })
                .then((msg) => { return msg })
        }
    }
}

module.exports = MessagesDao;