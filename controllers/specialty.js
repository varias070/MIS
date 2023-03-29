const db = require("../db_controller.js");

module.exports = {create_spec}


function create_spec(req, res){
    let body = "";
    req.on("data", chunk => {
        body += chunk.toString();
    });

    req.on("end", () =>{
        let data = JSON.parse(body)
        db.create_spec(data).then((answer) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            let res_data = JSON.stringify(answer)
            res.end(res_data)
        })
    })
}