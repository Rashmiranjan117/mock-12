const express = require("express");
require("dotenv").config();
const { connection } = require("./config/db");
const { addRouter } = require("./routes/add.routes");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());



app.use("/add", addRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Server is connected to db");
  } catch (err) {
    console.log("Something went wrong while connecting", err);
  }

  console.log("Server is connected to port", process.env.port);
});
