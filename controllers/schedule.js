const db = require("../db_controller.js");
const dayjs = require('dayjs');

module.exports = {create_schedule, get_schedule}


function create_schedule(req, res){
    let body = "";
    req.on("data", chunk => {
        body += chunk.toString();
    });

    req.on("end", () =>{
        let data = JSON.parse(body)
        let date = dayjs(data.date)
        let appointments = []
        let minute = 30
        for (let i = 0; i < 24; i++){
            let appointment_time = date.add(minute, "minute")
            let str_date = appointment_time.format('DD-MM-YYYY')
            let time_to = appointment_time.format('HH-mm')
            let time_from = appointment_time.subtract(30, "minute").format('HH-mm')
            let data = {
                doctor_id: data.doctor_id,
                date: str_date,
                time_from: time_from,
                time_to: time_to,
                is_free: true,

            }
            appointments.push(data)
            minute += 30
        }
        db.create_schedule(appointments)
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end()
    })
}


function get_schedule(req, res){
    let body = "";
    req.on("data", chunk => {
        body += chunk.toString();
    });

    req.on("end", () =>{
        let data = JSON.parse(body)
        db.get_schedule(data).then((answer) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            let res_data = JSON.stringify(answer)
            res.end(res_data)
        })
    })
}