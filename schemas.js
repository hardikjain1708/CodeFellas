const Joi = require('joi');
const { number } = require('joi');

module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().required(),
        company: Joi.string().required(),
        description: Joi.string().required()
    }).required()
});

module.exports.customerSchema = Joi.object({
    customer: Joi.object({
        customerName: Joi.string().required(),
        customerPhoneNum: Joi.number().required().min(0).max(9999999999),
        orderId: Joi.number().required().min(0)
    }).required()
});

module.exports.billSchema = Joi.object({
    bill: Joi.object({
        totalPrice: Joi.number().required().min(0),
        orderId: Joi.number().required().min(0)
    }).required()
});

module.exports.billproductSchema = Joi.object({
    billproduct: Joi.object({
        orderId: Joi.number().required().min(0),
        quanity: Joi.number().required().min(0),
        productName: Joi.string().required(),
        productPrice: Joi.number().required().min(0),
        totalProductPrice: Joi.number().required().min(0)
    }).required()
})
