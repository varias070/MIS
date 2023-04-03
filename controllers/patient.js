const db = require("../db_controller.js");
const validator = require('validator')

module.exports = {create_patient}


function create_patient(req, res){

    let body = "";
    req.on("data", chunk => {
        body += chunk.toString();
        res.setHeader("Content-Type", "application/json")
    });
    req.on("end", () =>{
        let errors = []
        let data = JSON.parse(body)
        if(!!!validator.isMobilePhone(data.phone)){
            errors.push("incorrect number phone")
        }
        if(!!!validator.isEmail(data.email)){
            errors.push("incorrect email")
        }
        if(/[0-9.!#@?:,*^%$]/.test(data.name)){
            errors.push("incorrect name")
        }

        if(errors.length == 0){
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
        }
        else{
            res_data = JSON.stringify(errors)
            res.end(res_data)
        };
    });
};