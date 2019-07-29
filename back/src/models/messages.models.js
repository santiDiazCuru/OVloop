const MessageDao = require('../daos/messages.dao');

class MessagesModel {
    static getChannelsList() {
        return MessageDao.getChannelsList()
    }

    static getOriginsList() {
        return MessageDao.getOriginsList()
    }

    static async getSingleMessage(requestId) {
        return MessageDao.getSingleMessage(requestId)
    }

    static getMessages(channel, origin, status, to, from) {
        let query = {}
        if (to && from) {
            if (channel) {
                query = {
                    date: {
                        $gte: from,
                        $lt: to
                    },
                    channel: channel
                }
            } else if (status) {
                query = {
                    date: {
                        $gte: from,
                        $lt: to
                    },
                    status: status
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
            } else if (status) {
                query = {
                    status: status
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
        return MessageDao.getMessages(query)
    }
    static async insert(phoneNumber, msg, origin, channel, requestId) {
        const fecha = new Date()
        const message = {
            phoneNumber: phoneNumber,
            requestId: requestId,
            status: '',
            msg: msg,
            channel: channel,
            last_provider: 'sns',
            origin: origin,
            date: fecha.toISOString()
        }
        console.log(message)
        return MessageDao.insert(message)
    }
}

module.exports = MessagesModel;