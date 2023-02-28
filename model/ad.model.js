const mongoose = require("mongoose");

const addSchema = mongoose.Schema({
  name: String,
  description: String,
  category: String,
  image: String,
  location: String,
  postedAt: String,
  price: Number,
});

const AddModel = mongoose.model("mockProduct", addSchema);

module.exports = { AddModel };
