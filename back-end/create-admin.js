const reader = require("readline-sync");
const mongoose = require('mongoose');
const employees = require("./employees.js");

const Employee = employees.model;

// connect to Mongo
mongoose.connect('mongodb://localhost:27017/guppy', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});


// get the needed info
let firstName = reader.question("First name: ");
let lastName = reader.question("Last name: ");
let email = reader.question("Email: ");
let username = reader.question("Username: ");
const password = reader.question("Password: ", {
    hideEchoBack: true
});

if (firstName === "" || lastName === "" || username === "" || password === "" || email === "") {
    console.log("You need to enter a first name, last name, email, username, and password");
    process.exit();
}

Employee.findOne({
    username: username
}).then((employee) => {
    if (employee) {
        console.log("That username already exists");
        process.exit();
    }
}).then(() => {
    let employee = new Employee({
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password,
        role: "admin"
    });
    employee.save().then(() => {
        console.log("OK, admin user created for", firstName, lastName, "with username", username);
        process.exit();
    });
}).catch(error => {
    console.log(error);
});