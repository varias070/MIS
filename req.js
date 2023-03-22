async function fetchAsync (url, payload) {

    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    let data = await response.text();
    console.log(data);
}

//let patient = {
//    "phone": "+7 913 743 24 35",
//    "name": "Jason",
//    "email": "jason@examaple.com",
//    "gender": "male",
//}
//fetchAsync("http://127.0.0.1:3000/create_patient", patient)

//let appointment = {
//    "date": "2018-04-04T14:00",
//    "doctor": 1,
//    "patient": 1,
//    "type": 0,
//    "is_free": false,
//}
//fetchAsync("http://127.0.0.1:3000/create_appointment", appointment)
//fetchAsync("http://127.0.0.1:3000/create_schedule", null)

let create_schedule = {
    "doctor_id": 1,
    "date": "2018-04-04T09:00",
}
fetchAsync("http://127.0.0.1:3000/create_schedule", create_schedule)
//let schedule = {
//    "doctor_id": 1,
//    "patient_id": null,
//    "date": '3-3-2018',
//    "time_from": '20-30',
//    "is_free": true,
//}
//fetchAsync("http://127.0.0.1:3000/get_schedule", schedule)

//let appointment_update = {
//    "id": 1,
//}
//fetchAsync("http://127.0.0.1:3000/make_appointment", appointment_update)
