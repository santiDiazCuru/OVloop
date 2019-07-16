const mongoose = require('mongoose');

var OriginListModel = new mongoose.Schema({
    origin: { type: String, required: true },
}, { versionKey: false });

const OriginList = mongoose.model('OriginList', OriginListModel);

module.exports = OriginList;