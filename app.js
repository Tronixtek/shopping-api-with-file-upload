const express = require("express");
const body_parser = require("body-parser");
const mongoose = require('mongoose');
const itemRoute = require("./routes/item");
const userRoute = require("./routes/user");
const app = express();
const item = require("./models/item");
const db_url = "mongodb://127.0.0.1/mydb";
const path = require('path');
mongoose.connect(db_url, { useNewurlParser: true, useUnifiedTopology: true }).then(
    () => {
        console.log("the connection was successfull")
    }
)
    .catch(
        (error) => {
            console.log("Unable to connect");
            console.error(error);
        }
    )
app.use(body_parser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/items', itemRoute);
app.use('/api', userRoute);


module.exports = app;