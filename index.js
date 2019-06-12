const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { MLab } = require('./configs/dev');

process.setMaxListeners(0);
mongoose.set('useCreateIndex', true);


mongoose
    .connect(MLab, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;

app.listen(port);

module.exports = app;