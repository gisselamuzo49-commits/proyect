const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://mongo:27017/tasks")
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

app.use("/api/tasks", require("./routes/tasks"));

app.listen(5000, () => console.log("Servidor en puerto 5000"));