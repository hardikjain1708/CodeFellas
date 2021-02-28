const express = require('express');
const router = express.Router({ mergeParams: true });

const Bill = require('../models/bill');
const Billproduct = require('../models/billproduct');

const { billproductSchema } = require('../schemas.js');


const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

const validateBillproduct = (req, res, next) => {
    const { error } = billproductSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.post('/', validateBillproduct, catchAsync(async (req, res) => {
    const bill = await Bill.findById(req.params.id);
    const billproduct = new Billproduct(req.body.billproduct);
    bill.billproducts.push(billproduct);
    await billproduct.save();
    await bill.save();
    req.flash('success', 'Created new Bill Product!');
    res.redirect(`/bills/${bill._id}`);
}))

router.delete('/:billproductId', catchAsync(async (req, res) => {
    const { id, billproductId } = req.params;
    await Bill.findByIdAndUpdate(id, { $pull: { billproducts: billproductId } });
    await Billproduct.findByIdAndDelete(billproductId);
    req.flash('success', 'Successfully deleted Bill Product')
    res.redirect(`/bills/${id}`);
}))

module.exports = router;