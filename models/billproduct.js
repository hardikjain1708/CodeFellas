const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BillproductSchema = new Schema({
    orderId: Number,
    quantity: Number,
    productName: String,
    productPrice: Number,
    totalProductPrice: Number
});

module.exports = mongoose.model("Billproduct", BillproductSchema);