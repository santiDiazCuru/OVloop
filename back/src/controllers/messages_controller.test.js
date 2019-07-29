const MessagesController = require('./messages.controller');
const messagesModel = require('../models/messages.models');
//Mongoose connection//
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.set('useNewUrlParser', true);

//Jest boilerplate//
jest.mock('../models/messages.models');
let sendMock;
let statusMock;
let res;
beforeEach(() => {
    sendMock = jest.fn();
    statusMock = jest.fn();
    res = { status: statusMock, send: sendMock };
    statusMock.mockImplementation(() => res);
})

describe('MessagesControler', () => {
    describe('Get messages', () => {
        it('should return 200 with if finds the message-singleMessage', async () => {
            const req = { params: { requestId: 906 } };
            const mockMessagesResult = {
                "_id": "5d3b136a2b702e058183e3fb",
                "phoneNumber": "451.663.7589",
                "requestId": "906",
                "status": "success",
                "channel": "sqs",
                "last_provider": "sns",
                "origin": "facuProject",
                "date": "2019-02-22T18:07:12.724Z"
            }
            messagesModel.getSingleMessage.mockImplementationOnce(() => mockMessagesResult);

            await MessagesController.getSingleMessage(req, res)
            expect(statusMock).toBeCalledWith(200);
            expect(sendMock).toBeCalledWith(expect.objectContaining(mockMessagesResult))
        })

        it("returns 400 message doesn't exist", async () => {
            const req = { params: { requestId: "-10" } }
            const mockMessagesResult = "null";

            //messagesModel.getSingleMessage.mockImplementationOnce(() => mockMessagesResult);

            await MessagesController.getSingleMessage(req, res);
            expect(statusMock).toBeCalledWith(400)
        })
        it('should return all messages if request has object body', async () => {
            const req = { body: {} };
            await MessagesController.getMessages(req, res)
            expect(statusMock).toBeCalledWith(200)
        })

        it("should return 400 if request doesn't have body", async () => {
            const req = { notBody: {} };
            await MessagesController.getMessages(req, res)
            expect(statusMock).toBeCalledWith(400)

        })
        describe('inserting messages', () => {
            it("should return 400 if message is incomplete", async () => {
                const req = { body: {} };
                statusMessage = "Message info is incomplete"
                await MessagesController.insert(req, res)
                expect(statusMock).toBeCalledWith(400);
                expect(sendMock).toBeCalledWith(statusMessage);
            })

            it("should return 400 if 1 attribute is missing", async () => {
                const req = {
                    body: {
                        phoneNumber: '123123',
                        channel: 'api',
                        origin: 'testingProject'
                    }
                };
                statusMessage = "Message info is incomplete";
                await MessagesController.insert(req, res);
                expect(statusMock).toBeCalledWith(400);
                expect(sendMock).toBeCalledWith(statusMessage);
            })
        })
    })
});
