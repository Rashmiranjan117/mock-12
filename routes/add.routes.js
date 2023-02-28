const express = require("express");

const { AddModel } = require("../model/ad.model");

const addRouter = express.Router();

addRouter.post("/", async (req, res) => {
  let data = req.body;
  try {
    let item = new AddModel(data);
    item.save();
    res.send({ msg: "Data added successfully" });
  } catch (err) {
    res.send({ msg: "Something went wrong while posting data to server" });
  }
});

addRouter.get("/", async (req, res) => {
  try {
    let all_data = await AddModel.find();
    res.send(all_data);
  } catch (err) {
    res.send("Something went wrong");
  }
});

addRouter.delete("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await AddModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Data Successfully Deleted" });
  } catch (err) {
    res.send({ msg: "Something went wrong" });
  }
});

addRouter.get("/filter", async (req, res) => {
  let category = req.query.category;
  let date = req.query.date;
  let name = req.query.name;
  let l = 4;
  let page = req.query.page;
  let price = req.query.price;
    console.log(name);
  try {
    let filteredData = await AddModel.find()
      .skip(page * l - l)
      .limit(l);
    let originalData = await AddModel.find()
      .skip(page * l - l)
      .limit(l);
    if (category) {
      filteredData = filteredData.filter((el, i) => {
        return el.category.toLowerCase().includes(category.toLowerCase());
      });
    } else if (name) {
      filteredData = filteredData.filter((el, i) => {
        return el.name.toLowerCase().includes(name.toLowerCase());
      });
    } else if (price) {
      filteredData = await AddModel.find({ price: { $lte: Number(price) } });
    }
    if (filteredData.length > 0) {
      res.send({ data: filteredData, msg: "filter" });
    } else {
      res.send({ data: originalData, msg: "org" });
    }
  } catch (err) {
    res.send({ msg: `Something went wrong ${err}` });
  }
});

module.exports = { addRouter };

// else if (date) {
//     filteredData = filteredData.filter((el, i) => {
//       return el.date.includes(date);
//     });
//   }
