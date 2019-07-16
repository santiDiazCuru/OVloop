const mongoose = require('mongoose')

const channel_list = ['api', 'sqs'];

var messagesModel = new mongoose.Schema({
    phoneNumber: { type: String, required: true },
    requestId: { type: String, required: true },
    status: { type: String, required: true, enum: ['success', 'failed'] },
    channel: { type: String, required: true, enum: channel_list },
    last_provider: { type: String, required: true },
    origin: { type: String, required: true },
    date: { type: String, required: true }
}, { versionKey: false });

messagesModel.statics.findChannels = function () {
    return channel_list;
};

const Message = mongoose.model('messages', messagesModel);

module.exports = Message