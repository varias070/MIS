const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
module.exports = {create_patient, create_doctor, create_schedule, get_schedule, make_appointment, create_spec}


async function create_patient(register_data) {
    try {
        let patient = await prisma.patient.create({
            data: register_data
        })
        return patient
    }
    catch {
        throw Error("Пользователь с указанным email уже существует. Укажите другой email")
    }
}


//// формат даты 2018-04-04T09:00
//async function check_appointment(data){
//    let appointment = await prisma.appointment.findFirst({
//        where: {doctor_id: data.doctor_id,
//                date: data.date,
//                time_from: data.time_from}
//    })
//    console.log(appointment)
//    if (appointment == null || appointment.is_free == false) {
//    console.log("66666666666666666666")
//        throw new Error("Запись на это время уже существует")
//    }
//
//}
//
//
//async function create_appointment(data){
//    try {
//        await check_appointment(data)
//        await prisma.appointment.create({
//            data: data
//        })
//        return "Запись созданна"
//    }
//    catch (err){
//        return err
//    }
//}


async function create_doctor(data){
    let doctor = await prisma.doctor.create({
        data: data
    })
    return doctor
}


async function create_schedule(data){
    let appointment = await prisma.appointment.createMany({
        data: data,
    })
}


async function get_schedule(data){
    let schedule = await prisma.appointment.findMany({
    where: data,
})
    return schedule
}

async function check_appointment(data){
    let appointment = await prisma.appointment.findFirst({
        where: {
            id: data.id,
            is_free: true
        }
    })
    if (appointment == null){
        return false
    }
    return true
}


async function make_appointment(data){
    let check = await check_appointment(data)
    if (check == false){
        return "На указанное время существует запись. Выбирите другое время"
    }
    let appointment = await prisma.appointment.update({
        where :{
            id: data.id,
        },
        data: {
            is_free: false,
            patient_id: data.patient_id,
            type: data.type
        },
    })
    return appointment
}

async function create_spec(data){
    let spec = await prisma.spec.create({
        data: data,
    })
    return spec
}