const connection = require('../db/db_connection')

// List of all ip
const ipList = (req,res)=>{
        connection.query("select * from ip_details", (err,result)=>{
            if (err) throw err;
            res.setHeader("Content-Type", "text/html");
            res.send(result)
        })
}

// Inserting IP data by scrapping
const insertData = (ip,port) => {
    connection.query('INSERT into `ip_details` (`ip`, `port`) VALUES ("'+ip+'", "'+port+'")',(err)=>{
        if (err) throw err; 
        console.log("Data inserted successfully");         
    })
}

module.exports = {ipList,insertData}