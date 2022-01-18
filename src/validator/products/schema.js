const Joi = require("joi");

const ProductPayloadSchema = Joi.object({
    product_name: Joi.string().require(),
    price: Joi.number().require(),
    discount: Joi.number().require(),
    size: Joi.string().require(),
    stock: Joi.number().require(),
    description: Joi.string().require(),
    color: Joi.string().require(),
    category: Joi.string().require(),
})

module.exports = { ProductPayloadSchema }