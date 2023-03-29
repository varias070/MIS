const db = require("../db_controller.js");

module.exports = {make_appointment}


function make_appointment(req, res){
    let body = "";
    req.on("data", chunk => {
        body += chunk.toString();
    });

    req.on("end", () =>{
        let data = JSON.parse(body)
        db.make_appointment(data).then((answer) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            let res_data = JSON.stringify(answer)
            res.end(res_data)
        })
    })
}