const sender = require("./sender.js")
const prisma = require('./prisma_client.js');
const dayjs = require('dayjs');


let today = dayjs()
let time = today.add(2, "hour").format("HH-mm")
let day = today.format("DD-MM-YYYY")
let today_appointments = prisma.get_today_appointments(day, time).then((appointments) => {
    for(let appointment of appointments){
        let email = appointment.patient.email
        let text = `Добрый день ${appointment.patient.name}! Напоминаем что вы записаны к ${appointment.doctor.spec.title} сегодня в ${appointment.time_from}`
        sender.send(email, text)
    }
})