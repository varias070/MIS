const db = require("./db_controller.js");
const dayjs = require('dayjs');

module.exports = {create_patient, create_doctor, create_schedule, get_schedule, make_appointment}


function create_patient(req, res){
    let body = "";
    req.on("data", chunk => {
        body += chunk.toString();
        res.setHeader("Content-Type", "application/json")
    });

    req.on("end", () =>{
        let data = JSON.parse(body)
        db.create_patient(data)
        .catch(err => {
            res_data = JSON.stringify(err.message)
            res.end(res_data)
        })
        .then((answer) => {
            res.statusCode = 200;
            res_data = JSON.stringify(answer)
            res.end(res_data)
        })
    });
};


function create_doctor(req, res){
    let body = "";
    req.on("data", chunk => {
        body += chunk.toString();
        res.setHeader("Content-Type", "application/json")
    });

    req.on("end", () =>{
        let data = JSON.parse(body)
        db.create_doctor(data)
        .catch(err => {
            res_data = JSON.stringify(err.message)
            res.end(res_data)
        })
        .then((answer) => {
            res.statusCode = 200;
            res_data = JSON.stringify(answer)
            res.end(res_data)
        })
    });
};

//function create_appointment(req, res){
//    let body = "";
//    req.on("data", chunk => {
//        body += chunk.toString();
//    });
//
//    req.on("end", () =>{
//        let data = JSON.parse(body)
//
//        let date = dayjs(data.date)
//        let str_date = `${date.day()}-${date.month()}-${date.year()}`
//        let time_from = `${date.hour()}-${date.minute()}`
//        let time_add = date.add(30, "minute")
//        let time_to = `${time_add.hour()}-${time_add.minute()}`
//        let appointment_data = {
//            "doctor_id": data.doctor,
//            "patient_id": data.patient,
//            "date": str_date,
//            "time_from": time_from,
//            "time_to": time_to,
//            "type": data.type,
//            "is_free": data.is_free,
//        }
//
//        let db_answer = db.create_appointment(appointment_data)
//                .then((answer) => {
//                console.log("feafaet")
//                    console.log(answer)
//                })
//        res.setHeader("Content-Type", "application/json");
//        console.log(db_answer)
//        if (db_answer == true){
//            res.statusCode = 200;
//            res_data = JSON.stringify(data)
//            res.end(res_data)
//        }
//        res_data = JSON.stringify({"except": "Запись на это время уже существует"})
//        return res.end(res_data)
//    });
//};

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


function make_appointment(req, res){
    let body = "";
    req.on("data", chunk => {
        body += chunk.toString();
    });

    req.on("end", () =>{
        let data = JSON.parse(body)
        db.make_appointment(data).then((answer) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            let res_data = JSON.stringify(answer)
            res.end(res_data)
        })
    })
}