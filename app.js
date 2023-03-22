const http = require('node:http');
const { parse} = require('querystring')
const fs = require("fs");

//import * as controller from '.controller.js';
const controller = require("./controller.js");

const hostname = "127.0.0.1";
const port = 3000;


const server = http.createServer((req, res) => {
    if (req.url == "/create_patient"){
        controller.create_patient(req, res)
    }

//    if (req.url == "/create_appointment"){
//        controller.create_appointment(req, res)
//    }

    if (req.url =="/create_schedule"){
        controller.create_schedule(req, res)
    }

//    else if (req.url == "/create_entry"){
//        create_entry(req, res)
//    }
//
//    else if (req.url == "/get_schedule"){
//        get_schedule(req, res)
//    }

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
