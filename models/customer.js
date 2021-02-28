const { date } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    customerName: String,
    customerPhoneNum: Number,
    orderId: Number
});

module.exports = mongoose.model('Customer', CustomerSchema);