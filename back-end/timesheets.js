const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const employees = require("./employees.js");

const Employee = employees.model;
const validUser = employees.valid;

const timesheetSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.ObjectId,
        ref: "Employee"
    },

    clockIn: String,
    clockOutLunch: String,
    clockInLunch: String,
    clockOut: String,
    dayTotal: String,

    status: {
        type: String,
        default: ""
    },
    created: {
        type: Date,
        default: Date.now
    },
});

// Create Timesheet
router.post('/', validUser, async (req, res) => {
    const timesheet = new Timesheet({
        employee: req.employee,
        clockIn: req.clockIn,
        clockOutLunch: req.clockOutLunch,
        clockInLunch: req.clockIn,
        clockOut: req.clockOut,
        dayTotal: req.dayTotal,
    });
    try {
        await timesheet.save();
        return res.send({
            timesheet: timesheet
        });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// Get Timesheets
router.get('/', validUser, async (req, res) => {
    let sheets = [];
    try {
        if (req.employee.role === "admin") {
            sheets = await Timesheet.find().sort({
                created: -1
            });
        } else {
            sheets = await Timesheet.find({
                employee: req.employee
            }).sort({
                created: -1
            });
        }
        return res.send({
            timesheets: sheets
        });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// Edit Timesheet
router.put('/:id', validUser, async (req, res) => {
    if (req.employee.role !== "admin") {
        return res.sendStatus(403);
    }
    if (!req.body.status) {
        return res.status(400).send({
            message: "status is required"
        });
    }
    try {
        let timesheet = await Timesheet.findOne({
            _id: req.params.id
        });
        timesheet.status = req.body.status;
        await timesheet.save();
        return res.send({
            timesheet: timesheet
        });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});


const Timesheet = mongoose.model('Timesheet', timesheetSchema);


module.exports = {
    routes: router
}