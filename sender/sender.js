const nodemailer = require('nodemailer');

module.exports = {send}

let transporter = nodemailer.createTransport({
    service: 'gmail',
        auth: {
            user: 'email@gmail.com',
            pass: 'password'
        }
    })

function send(email, text){
    let mailOptions = {
        from: 'MIS@gmail.com',
        to: email,
        subject: "Оповищение о приеме к врачу",
        text: text,
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
}