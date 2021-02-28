const mongoose = require('mongoose');
const Customer = require('../models/customer');

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

const seedDB = async () => {
    await Customer.deleteMany({});
        const c = new Customer({
            customerName: 'Cust 1',
            customerPhoneNum: 987375692
        })
        await c.save();
}

seedDB().then(() => {
    mongoose.connection.close();
})