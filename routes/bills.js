const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { customerSchema } = require('../schemas.js');
const { billSchema } = require('../schemas.js');
const { isLoggedIn } = require('../middleware');

const ExpressError = require('../utils/ExpressError');
const Customer = require('../models/customer');
const BillItems = require('../models/bill');
const Warehouse = require('../models/campground');
const Bill = require('../models/bill');

const validateBill = (req, res, next) => {
    const { error } = billSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.get('/', catchAsync(async (req, res) => {
    const bills = await Bill.find({});
    res.render('bills/index', { bills })
}));


router.get('/:id', catchAsync(async (req, res,) => {
    const bill = await Bill.findById(req.params.id).populate('billproducts');
    if (!bill) {
        req.flash('error', 'Cannot find that bill!');
        return res.redirect('bills');
    }
    res.render('bills/show', { bill });
}));

router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Bill.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted product')
    res.redirect('/bills');
}));

module.exports = router;