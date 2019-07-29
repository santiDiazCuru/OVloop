const MessageModel = require('./messages.models');
const MessageDao = require('../daos/messages.dao')
const Message = require('../dbmodels/message');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.set('useNewUrlParser', true);
//jest.mock('../daos/messages.dao');


describe('MessageModel test', () => {
    let connection;
    let db;
    beforeAll(async () => {
        connection = mongoose.connect("mongodb://localhost/ovloop")
        // .then(() => console.log('mongoDB connected to ovloop'))
        // .catch(err => console.log('db error: ', err));
        //db = await connection.db(global.__MONGO_DB_NAME__);
    });
    afterAll(async () => {
        await connection.close();
        await mongoose.close();
    });
    describe('get messages', () => {
        it('should find specific message', async () => {
            let singleMessage;
            await Message.findOne({ requestId: 689 })
                .then((msg) => singleMessage = msg)

            return MessageModel.getSingleMessage(689)
                .then((msg) => {
                    expect(msg.requestId).toEqual(singleMessage.requestId)
                })
        });

        it('should return null if requestId doesnt exist', async () => {
            return MessageModel.getSingleMessage(-10)
                .then((msg) => {
                    expect(msg).toBeNull()
                })
        })

        it('Status: should find all failed messages', async () => {
            let failedMessages;
            await Message.find({ status: 'failed' })
                .then((msgs) => failedMessages = msgs)

            return MessageModel.getMessages(null, null, 'failed')
                .then((msg) => {
                    expect(msg.length).toEqual(failedMessages.length)
                })
        })

        it('Status: should find all success messages', async () => {
            let successMessages;
            await Message.find({ status: 'success' })
                .then((msgs) => successMessages = msgs)

            return MessageModel.getMessages(null, null, 'success')
                .then((msg) => {
                    expect(msg.length).toEqual(successMessages.length)
                })
        })

        it('should find all API messages', async () => {
            let apiMessages;
            await Message.find({ channel: 'api' })
                .then((msgs) => apiMessages = msgs)

            return MessageModel.getMessages('api')
                .then((msg) => {
                    expect(msg.length).toEqual(apiMessages.length)
                })
        })

        it('Should find all messages', async () => {
            let allMessages;
            await MessageDao.getMessages()
                .then((msgs) => {
                    allMessages = msgs
                })
            return MessageModel.getMessages()
                .then((msg) => {
                    expect(msg.length).toEqual(allMessages.length)
                })
        })

        it('Should query by date', async () => {
            let dateMessages;
            query = {
                date: {
                    $gte: "2019-01-01",
                    $lt: "2019-03-03"
                }
            }
            await MessageDao.getMessages(query)
                .then((msgs) => {
                    dateMessages = msgs
                })
            return MessageModel.getMessages(null, null, null, "2019-03-03", "2019-01-01")
                .then((msg) => {
                    expect(msg.length).toEqual(dateMessages.length)
                })
        })
        describe('inserting test - Models test', () => {
            it('Should return ???', async () => {
                const result = await MessageDao.insert('123123', 'Test mg', 'testProjects', 'api', 'lasmdqwe123');
                console.log(result)
                expect(result).toEqual({})

            })
        })
    })
})
