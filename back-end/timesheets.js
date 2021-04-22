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

    date: String,
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

const Timesheet = mongoose.model('Timesheet', timesheetSchema);

// Create Timesheet
router.post('/', validUser, async (req, res) => {
    const timesheet = new Timesheet({
        employee: req.employee,
        date: req.body.date,
        clockIn: req.body.clockIn,
        clockOutLunch: req.body.clockOutLunch,
        clockInLunch: req.body.clockInLunch,
        clockOut: req.body.clockOut,
        dayTotal: req.body.dayTotal,
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
    /*if (req.employee.role !== "admin") {
        return res.sendStatus(403);
    }*/
    /*if (!req.body.status) {
        return res.status(400).send({
            message: "status is required"
        });
    }*/
    try {
        let timesheet = await Timesheet.findOne({
            _id: req.params.id
        });
        console.log(timesheet);
        timesheet.status = req.body.status;
        timesheet.clockIn = req.body.clockIn;
        timesheet.clockOut = req.body.clockOut;
        timesheet.clockOutLunch = req.body.clockOutLunch;
        timesheet.clockInLunch = req.body.clockInLunch;
        await timesheet.save();
        return res.send({
            timesheet: timesheet
        });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// Delete Timesheet
router.delete('/:id', validUser, async(req, res) => {
    console.log("Delete Called");
    try {
        let timesheet = await Timesheet.findOne({
            _id: req.params.id
        });
        if (!timesheet) {
            res.send(404);
            return;
        }
        await timesheet.delete();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

module.exports = {
    routes: router
}