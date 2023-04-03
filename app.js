//const http = require('node:http');
const { parse} = require('querystring')
const fs = require("fs");
const express = require('express');
const app = express();

const patient = require("./controllers/patient.js")
const appointment = require("./controllers/appointment.js")
const doctor = require("./controllers/doctor.js")
const schedule = require("./controllers/schedule.js")
const speciality = require("./controllers/specialty.js")

const hostname = "0.0.0.0";
const port = 3000;


app.post("/create_patient", patient.create_patient)
app.post("/create_doctor", doctor.create_doctor)
app.post("/create_spec", speciality.create_spec)
app.post("/create_schedule", schedule.create_schedule)
app.post("/get_schedule", schedule.get_schedule)
app.post("/make_appointment", appointment.make_appointment)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
//const server = http.createServer((req, res) => {
//    if (req.url == "/create_patient"){
//        patient.create_patient(req, res)
//    }
//
//    if (req.url == "/create_doctor"){
//        doctor.create_doctor(req, res)
//    }
//
//    if (req.url == "/create_spec"){
//        speciality.create_spec(req, res)
//    }
//
//    if (req.url =="/create_schedule"){
//        schedule.create_schedule(req, res)
//    }
//
//    if (req.url == "/get_schedule"){
//        schedule.get_schedule(req, res)
//    }
//
//    if (req.url == "/make_appointment"){
//        appointment.make_appointment(req, res)
//    }
//});
//
//server.listen(port, hostname, () => {
//    console.log(`Server running at http://${hostname}:${port}/`);
//});
