const http = require('node:http');
const { parse} = require('querystring')
const fs = require("fs");

//import * as controller from '.controller.js';
const controller = require("./controller.js");

const hostname = "0.0.0.0";
const port = 3000;


const server = http.createServer((req, res) => {
    if (req.url == "/create_patient"){
        controller.create_patient(req, res)
    }

    if (req.url == "/create_doctor"){
        controller.create_doctor(req, res)
    }

    if (req.url == "/create_spec"){
        controller.create_spec(req, res)
    }

    if (req.url =="/create_schedule"){
        controller.create_schedule(req, res)
    }

    if (req.url == "/get_schedule"){
        controller.get_schedule(req, res)
    }

    if (req.url == "/make_appointment"){
        controller.make_appointment(req, res)
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
