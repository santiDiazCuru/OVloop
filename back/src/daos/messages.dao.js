const Message = require('../models/message')

class MessagesDao {

    static getMessagesSent(requestId) {
        return Message.findOne({
            requestId: requestId
        })
            .then((message) => {
                return message
            })
    }

    static getAllMessages() {
        return Message.find().then((msgs) => {
            return msgs
        })
    }

    static getChannelMessages(channel) {
        return Message.find({ channel: channel })
            .then((msgs) => msgs)

    }

    static getMessagesByDate(from, to) {
        return Message.find({
            date: {
                $gte: from,
                $lte: to
            }
        }).then((msgs) => {
            return msgs
        })
    }

    static insert(message) {
        return Message.create(message)
            .then(message => {
                return message
            })
    }

}

module.exports = MessagesDao;