const db = require("../db_controller.js");

module.exports = {create_doctor}


function create_doctor(req, res){
    let body = "";
    req.on("data", chunk => {
        body += chunk.toString();
        res.setHeader("Content-Type", "application/json")
    });

    req.on("end", () =>{
        let data = JSON.parse(body)
        db.create_doctor(data)
        .catch(err => {
            res_data = JSON.stringify(err.message)
            res.end(res_data)
        })
        .then((answer) => {
            res.statusCode = 200;
            res_data = JSON.stringify(answer)
            res.end(res_data)
        })
    });
};