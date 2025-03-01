const mongoose = require('mongoose')
const Joi = require('joi')

const Customers = mongoose.model("Customers", new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    isGold: {
        type :Boolean,
        default : false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    }
}))

function validateCustomer(customers) {
    const schema = Joi.object({
      name: Joi.string().min(5).max(50).required(),
      phone: Joi.string().min(5).max(50).required()
  
    });
  
    return schema.validate(genre);
  }
  