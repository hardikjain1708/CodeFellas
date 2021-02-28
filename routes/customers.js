const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { customerSchema } = require('../schemas.js');
const { isLoggedIn } = require('../middleware');

const Customer = require('../models/customer');
const BillItems =  require('../models/bill');
const Warehouse =  require('../models/campground');
let orderId = 0;
let billId = 0;
let customerDetails = {};
const ExpressError = require('../utils/ExpressError');

const validateCustomer = (req, res, next) => {
    const { error } = customerSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.get("/addCustomer", catchAsync(async (req, res, next) => {
    res.render("customers/addCustomer");
}))

router.post('/customerBill', isLoggedIn,catchAsync(async (req, res, next) => {
    req.body.customer["orderId"] = orderId;
    const customer = new Customer(req.body.customer);
    await customer.save();
    const billObj = new BillItems({
        orderId,
        totalPrice: 0,
        orders:[]
    })
    await billObj.save()
    billId = billObj._id;
    customerDetails = req.body.customer;
    orderId+=1;
    req.flash('success', 'Successfully made a new customer!');
    res.render("customers\\customerBill.ejs",{customer : req.body.customer,billItems:null})
}))

router.get('/addItem', isLoggedIn,catchAsync(async (req, res, next) => {
    res.render("customers/addItem");
}))

router.post("/addItem", isLoggedIn, catchAsync(async (req, res, next) => {
    console.log(req.body.billItem["productName"])
    const item = await Warehouse.findOne({title:String(req.body.billItem["productName"])}, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Result : ", docs); 
        } 
    });
    let obj = {
        quantity: parseInt(req.body.billItem["qty"]),
        productName: item.title,
        productPrice: parseInt(item.price),
        orderId: orderId-1
    }
    const totalProductPrice = obj.quantity * obj.productPrice;
    obj["totalProductPrice"] = totalProductPrice;
    let oldBill = await BillItems.findById(billId);
    let grandTotal = 0;
    oldBill.orders.push(obj)
    for(let i of oldBill.orders){
        grandTotal += i.totalProductPrice;
    }
    oldBill["totalPrice"] = grandTotal;
    await oldBill.save()
    console.log(oldBill)
    res.render("customers\\customerBill.ejs",{customer:customerDetails,billItems:oldBill})
}))

module.exports = router;