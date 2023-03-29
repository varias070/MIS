const db = require("../db_controller.js");

module.exports = {create_patient}


function create_patient(req, res){
    let body = "";
    req.on("data", chunk => {
        body += chunk.toString();
        res.setHeader("Content-Type", "application/json")
    });

    req.on("end", () =>{
        let data = JSON.parse(body)
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
    });
};