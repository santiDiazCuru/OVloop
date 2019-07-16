const Message = require('../models/message');
const OriginList = require('../models/originList');
class MessagesDao {

    static getMessagesSent(requestId) {
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
        return OriginList.findOne({ origin: message.origin })
            .then((origin) => {
                if (origin == null) OriginList.create({ origin: message.origin })
            })
            .then((msg) => {
                Message.create(message)
                    .then(message => {
                        return message
                    })
            })
    }

}

module.exports = MessagesDao;