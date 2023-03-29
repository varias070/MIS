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
            let r = date.add(minute, "minute")
            let str_date = `${r.day()}-${r.month()}-${r.year()}`
            let time_to = `${r.hour()}-${r.minute()}`
            let time_from = r.subtract(30, "minute")
            let str_time_from = `${time_from.hour()}-${time_from.minute()}`
            data = {
                doctor_id: data.doctor_id,
                date: str_date,
                time_from: str_time_from,
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