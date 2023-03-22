const { PrismaClient } = require('@prisma/client');
const error = require("./errors.js")

const prisma = new PrismaClient();
module.exports = {create_patient, create_doctor, create_schedule, get_schedule}


async function create_patient(register_data) {
    let patient = await prisma.patient.create({
        data: register_data
    })
    console.log(patient)
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
    console.log(doctor)
}


async function create_schedule(data){
    let appointment = await prisma.appointment.createMany({
        data: data,
    })
}


async function get_schedule(data){
    let schedule = await prisma.doctor.findUnique({
  where: {
    id: 1,
  },
  include: {
    appointments: true,
  },
})
    console.log(schedule)
}