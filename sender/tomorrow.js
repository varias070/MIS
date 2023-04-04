const sender = require("./sender.js")
const prisma = require('./prisma_client.js');
const dayjs = require('dayjs');

let today = dayjs()
let tomorrow = today.add(1, "day").format('DD-MM-YYYY')
let tomorrow_appointments = prisma.get_tomorrow_appointments(tomorrow).then((appointments) => {
    for(let appointment of appointments){
        let email = appointment.patient.email
        let text = `Добрый день ${appointment.patient.name}! Напоминаем что вы записаны к ${appointment.doctor.spec.title} завтра в ${appointment.time_from}`
        sender.send(email, text)
    }
})