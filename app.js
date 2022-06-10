const express = require("express");
const mongoose = require("mongoose")
const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.json())
require("dotenv/config")
const postRoutes = require("./routes/posts");
app.use("/posts", postRoutes);


// db connection

mongoose.connect(process.env.DB_CONNECTION, () => console.log("DB connected"))

// starting the server
app.listen(5000, () => console.log('started at port 5000'))