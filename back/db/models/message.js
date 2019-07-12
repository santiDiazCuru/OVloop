const mongoose = require('mongoose')

var statusOption = ['success', 'failed'];
var channelOption = ['api', 'sqs'];

var messagesModel = new mongoose.Schema({
    phoneNumber: { type: String, required: true },
    requestId: { type: String, required: true },
    status: { type: String, required: true, enum: statusOption },
    channel: { type: String, required: true, enum: channelOption },
    last_provider: { type: String, required: true },
    origin: { type: String, required: true },
    date: { type: String, required: true }
}, { versionKey: false });

function channelArr() {
    return channelOption;
}

const Message = mongoose.model('messages', messagesModel)


module.exports = {Message, channelArr};