const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Customer, validate } = require("../models/customer");

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });

  customer = await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!customer) return res.status(404).send("The customer with the given ID was not found.");
  
  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) return res.status(404).send("The customer with the given ID was not found.");

  res.send(customer);
});

async function createCustomer() {
  const customer = new Customer({
      name: "Nandu", 
      isGold : true,
      phone : '9990418622'
  });

  try {
      const result = await customer.save();
      console.log(result);
      // await course.validate() 
  } catch (ex) {
      // console.log(ex.message)
      for(field in ex.errors) // for multilple validation error
          console.log(ex.errors[field].message);
  }
}

createCustomer()

module.exports = router;
