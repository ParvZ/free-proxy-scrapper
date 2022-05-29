const cheerio = require('cherio')
const axios = require('axios')
const express = require('express');
const bodyParser = require('body-parser')
require('dotenv/config')

const queries = require('./models/queries')
const app = express();

// middleware
app.use(bodyParser.json())


// Scrapping function
const getData = async()=>{
    const {data} = await axios.get(process.env.IP_URL);
    const  $ = cheerio.load(data)
    // max ip counter
    const maxIP = 20;
    $('table tbody tr').each((i,item)=>{
        if( i < maxIP){
            const ip = $(item).children("td:nth-child(1)").text()
            const port = $(item).children("td:nth-child(2)").text()
            queries.insertData(ip,port)

        } else {
            return false;
        }
        
    })
 
}

// Routes
app.get('/', (req,res)=>{
    getData();
    res.send('Dont load this page again. Route to active-ip to get the IP')
})
app.get('/active-ip',queries.ipList)


//connecting to API server
app.listen(3000,()=>{
    console.log('API Server connected')
})