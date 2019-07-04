const mongoose = require('mongoose')

var messagesModel = new mongoose.Schema({
    phoneNumber: { type: String, required: true },
    requestId: { type: String, required: true },
    status: { type: String, required: true, enum: ['success', 'failed'] },
    channel: { type: String, required: true,  enum: ['api', 'sqs'] },
    last_provider: { type: String, required: true },
    origin: { type: String, required: true },
}, { versionKey: false });

const Message = mongoose.model('messages', messagesModel)


module.exports = Message;