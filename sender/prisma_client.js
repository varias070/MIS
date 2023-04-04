const { PrismaClient } = require('@prisma/client');

module.exports = {get_tomorrow_appointments, get_today_appointments}

const prisma = new PrismaClient();

async function get_tomorrow_appointments(date){
    let appointments = await prisma.appointment.findMany({
        where: {
            date: date,
            NOT: {patient: null},
        },
        include: {
            doctor: {include: {spec: true}},
            patient: true,
        },
    })
    return appointments
}

async function get_today_appointments(date, time){
    let appointments = await prisma.appointment.findMany({
        where: {
            date: date,
            time_from: time,
            NOT: {patient: null},
        },
        include: {
            doctor: {include: {spec: true}},
            patient: true,
        },
    })
    return appointments
}