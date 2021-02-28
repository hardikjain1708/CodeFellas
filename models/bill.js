const { date } = require('joi');
const mongoose = require('mongoose');
// const Billproduct = require('./billproduct')
const Schema = mongoose.Schema;

const BillSchema = new Schema({
    totalPrice: Number,
    orderId: Number,
    orders: []
});

// BillSchema.post('findOneAndDelete', async function (doc) {
//     if (doc) {
//         await Billproduct.deleteMany({
//             _id: {
//                 $in: doc.billproducts
//             }
//         })
//     }
// })

module.exports = mongoose.model('Bill', BillSchema);