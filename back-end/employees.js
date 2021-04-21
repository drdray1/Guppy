const express = require("express");
const mongoose = require('mongoose');
const argon2 = require("argon2");

const router = express.Router();

// This is the schema. Users have usernames and passwords. We solemnly promise to
// salt and hash the password!
const employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String,
    role: {
        type: String,
        default: ""
    }
});

// This is a hook that will be called before a user record is saved,
// allowing us to be sure to salt and hash the password first.
employeeSchema.pre('save', async function(next) {
    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password'))
        return next();

    try {
        // generate a hash. argon2 does the salting and hashing for us
        const hash = await argon2.hash(this.password);
        // override the plaintext password with the hashed one
        this.password = hash;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// This is a method that we can call on User objects to compare the hash of the
// password the browser sends with the has of the user's true password stored in
// the database.
employeeSchema.methods.comparePassword = async function(password) {
    try {
        // note that we supply the hash stored in the database (first argument) and
        // the plaintext password. argon2 will do the hashing and salting and
        // comparison for us.
        const isMatch = await argon2.verify(this.password, password);
        return isMatch;
    } catch (error) {
        return false;
    }
};

// This is a method that will be called automatically any time we convert a user
// object to JSON. It deletes the password hash from the object. This ensures
// that we never send password hashes over our API, to avoid giving away
// anything to an attacker.
employeeSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
}

// create a User model from the User schema
const Employee = mongoose.model('Employee', employeeSchema);

/* Middleware */

// middleware function to check for logged-in users
const validEmployee = async (req, res, next) => {
    if (!req.session.employeeID)
        return res.status(403).send({
            message: "not logged in"
        });
    try {
        const employee = await Employee.findOne({
            _id: req.session.employeeID
        });
        if (!employee) {
            return res.status(403).send({
                message: "not logged in"
            });
        }
        // set the user field in the request
        req.employee = employee;
    } catch (error) {
        // Return an error if user does not exist.
        return res.status(403).send({
            message: "not logged in"
        });
    }

    // if everything succeeds, move to the next middleware
    next();
};

/* API Endpoints */

/* All of these endpoints start with "/" here, but will be configured by the
   module that imports this one to use a complete path, such as "/api/user" */

// create a new user
router.post('/', async (req, res) => {
    // Make sure that the form coming from the browser includes a username and a
    // passsword, otherwise return an error. A 400 error means the request was
    // malformed.
    if (!req.body.username || !req.body.password || !req.body.email)
        return res.status(400).send({
            message: "first name, last name, username, password and email are required"
        });

    try {

        //  Check to see if username already exists and if not send a 403 error. A 403
        // error means permission denied.
        const existingEmployee = await Employee.findOne({
            username: req.body.username
        });
        if (existingEmployee)
            return res.status(403).send({
                message: "username already exists"
            });

        // create a new user and save it to the database
        const employee = new Employee({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });
        await employee.save();

        // set session info
        req.session.employeeID = employee._id;

        // send back a 200 OK response, along with the user that was created
        return res.send({
            employee: employee
        });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// login a user
router.post('/login', async (req, res) => {
    // Make sure that the form coming from the browser includes a username and a
    // password, otherwise return an error.
    if (!req.body.username || !req.body.password)
        return res.sendStatus(400);

    try {
        //  lookup user record
        const employee = await Employee.findOne({
            username: req.body.username
        });
        // Return an error if user does not exist.
        if (!employee)
            return res.status(403).send({
                message: "username or password is wrong"
            });

        // Return the SAME error if the password is wrong. This ensure we don't
        // leak any information about which users exist.
        if (!await employee.comparePassword(req.body.password))
            return res.status(403).send({
                message: "username or password is wrong"
            });

        // set session info
        req.session.employeeID = employee._id;

        return res.send({
            employee: employee
        });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// get logged in user or users if admin
router.get('/', validEmployee, async (req, res) => {
    let employees = [];
    try {
        if (req.employee.role === "admin") {
            employees = await Employee.find().sort({
                created: -1
            });
            return res.send({
                employees: employees
            })
        } else {
            return res.send({
                employee: req.employee
            });
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// Logout
router.delete("/", validEmployee, async(req,res) => {
    try {
        req.session = null;
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = {
    routes: router,
    model: Employee,
    valid: validEmployee
};