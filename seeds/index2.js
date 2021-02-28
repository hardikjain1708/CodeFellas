const mongoose = require('mongoose');
const Bill = require('../models/bill');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Bill.deleteMany({});
        const b = new Bill({
            customerName: 'Cust 1',
            customerPhoneNum: 9873754673,
            totalPrice: 1000
        })
        await b.save();
}

seedDB().then(() => {
    mongoose.connection.close();
})