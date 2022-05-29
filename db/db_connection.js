const mysql = require('mysql')
require('dotenv/config')

const connection = mysql.createConnection({
    host     : process.env.HOST,
    user     : process.env.USER,
    password : process.env.PASS,
    database : process.env.DB
})

connection.connect((err)=>{
    if (err) throw err; 
    console.log("Local DB Connected!");         
});

module.exports = connection