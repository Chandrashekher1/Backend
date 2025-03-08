const Joi = require("joi"); // Added Joi for validation
const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    isGold : {
      type :Boolean,
      default: false
    },
    phone: {
      type: String,
      required: true,
      minlength: 0,
      maxlength: 200,
    }
  });
  
const Customer = mongoose.model("Customer", CustomerSchema);
  
function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold:Joi.boolean()
  });

  return schema.validate(customer);
}

exports.Customer = Customer
exports.validate = validateCustomer