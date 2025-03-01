const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

router.get("/", async (req, res) => {
  const customers = await Customers.find().sort("name");
  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customers = new Customers({ 
    name: req.body.name,
    phone : req.body.phone,
    isGold: req.body.isGold
   });
  customers = await customers.save();

  res.send(customers);
});



module.exports = router
