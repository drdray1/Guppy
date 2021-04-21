// This is my main server js file

const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

mongoose.connect('mongodb://localhost:27017/guppy', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
    name: 'session',
    keys: ['secretValue'],
    cookie: {
        maxAge: 1 * 60 * 60 * 1000 // 1 hours
    }
}));

const employees = require("./employees.js");
app.use("/api/employees", employees.routes);

// listen on port 3002
app.listen(3002, () => console.log('Server listening on port 3002!'));