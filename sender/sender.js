const nodemailer = require('nodemailer');
const conf = require('./config.js')

module.exports = {send}

let transporter = nodemailer.createTransport({
    service: conf.transporter.service,
        auth: {
            user: conf.transporter.auth.user,
            pass: conf.transporter.auth.pass
        }
    })

function send(email, text){
    let mailOptions = {
        from: conf.transporter.auth.user,
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