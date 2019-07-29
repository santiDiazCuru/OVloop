const MessageModel = require('./messages.models');
const MessageDao = require('../daos/messages.dao')
const Message = require('../dbmodels/message');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.set('useNewUrlParser', true);
jest.mock('../daos/messages.dao');


describe('MessageModel test', () => {
    // let connection;
    // let db;
    // beforeAll(async () => {
    //     connection = mongoose.connect("mongodb://localhost/ovloop")
    //     // .then(() => console.log('mongoDB connected to ovloop'))
    //     // .catch(err => console.log('db error: ', err));
    //     //db = await connection.db(global.__MONGO_DB_NAME__);
    // });
    // afterAll(async () => {
    //     await connection.close();
    //     await mongoose.close();
    // });
    describe('get messages', () => {
        it('should find specific message', async () => {
            const mockMessagesResult = {
                "_id": "5d3ceb8928a9803bffaf9f77",
                "phoneNumber": "392-345-2816 x12799",
                "requestId": "638",
                "status": "success",
                "channel": "sqs",
                "last_provider": "sns",
                "origin": "facuProject",
                "date": "2019-05-27T06:30:22.097Z"
            }
            MessageDao.getSingleMessage.mockImplementationOnce(() => mockMessagesResult);

            const result = await MessageModel.getSingleMessage(689)
            expect(result).toEqual(mockMessagesResult)
        })
    });

    it("should return the number if requestId doesn't exist", async () => {
        const mockMessagesResult = 689;
        MessageDao.getSingleMessage.mockImplementationOnce(() => mockMessagesResult);

        const result = await MessageModel.getSingleMessage()
        expect(result).toEqual(mockMessagesResult)
    })

    describe('inserting test - Models test', () => {
        it('Should insert message', async () => {
            const mockMessagesResult = {}
            MessageDao.insert.mockImplementationOnce(() => mockMessagesResult)
            const result = await MessageModel.insert('12345', 'testing', 'testingProject', 'api', '12312312')
            expect(result).toEqual(mockMessagesResult)
        })

    })
})
