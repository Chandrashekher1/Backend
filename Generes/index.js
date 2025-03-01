const express = require("express");
const genres = require("./routes/genres"); 
const customers = require("./routes/customers");
const mongoose = require("mongoose");
const app = express();
app.use(express.json()); 

mongoose.connect("mongodb://localhost/Genres", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could not connect to MongoDB...", err));

app.use("/api/genres", genres);
app.use("/api/customers", customers)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
