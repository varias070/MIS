const { PrismaClient } = require('@prisma/client');
const dayjs = require('dayjs');

const prisma = new PrismaClient();


async function main(){
    let specs = [
        {"title": "Surgeon"},
        {"title": "Therapist"},
        {"title": "Ophthalmologist"},
        {"title": "Dermatologist"}
    ]

    let doctors = [
        {"name": "Ivan", "spec_id": 1, "price": 1000},
        {"name": "Anatolii", "spec_id": 2, "price": 2000},
        {"name": "Vasilii", "spec_id": 3, "price": 1500},
        {"name": "Elizabet", "spec_id": 4, "price": 1000},
    ]

    let patients = [
        {"phone": "+7 913 743 24 35", "name": "Alex", "email": "xamale@examaple.com", "gender": "male"},
        {"phone": "+7 914 743 24 35", "name": "Jack", "email": "7xmaple@examaple.com", "gender": "male"},
        {"phone": "+7 915 743 24 35", "name": "Filip", "email": "8amaple@examaple.com", "gender": "male"},
        {"phone": "+7 916 743 24 35", "name": "Elena", "email": "9xamale@examaple.com", "gender": "male"}
    ]

//    await prisma.spec.createMany({
//        data: specs,
//    })
//    await prisma.doctor.createMany({
//        data: doctors,
//    })
//    await prisma.patient.createMany({
//        data: patients,
//    })

    let date = dayjs("2023-10-04T9:00")
    let appointments = []
    let minute = 30
    for (let doctor_id = 1; doctor_id < 5; doctor_id++){
        for (let i = 0; i < 24; i++){
            let appointment_time = date.add(minute, "minute")
            let str_date = appointment_time.format('DD-MM-YYYY')
            let time_to = appointment_time.format('HH-mm')
            let time_from = appointment_time.subtract(30, "minute").format('HH-mm')
            let data = {
                doctor_id: doctor_id,
                date: str_date,
                time_from: time_from,
                time_to: time_to,
                is_free: true,

            }
            appointments.push(data)
            minute += 30
        }
    minute = 30
    }
    await prisma.appointment.createMany({
        data: appointments,
    })
    console.log("База данных заполнена")

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })