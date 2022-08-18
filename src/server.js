const http = require('http')
const mongoose = require('mongoose')
const {startScrap} = require('./services/index')
const app = require('./index')
require('dotenv').config()

const PORT = 8010
const MONGO_URL = process.env.MONGO_URL

const server = http.createServer(app)

mongoose.connection.once('open', () => {
    console.log(`



    -------------------------------------------
        
            MongoDB connection is ready!
     
    -------------------------------------------




    `);
})

mongoose.connection.once('error', (err) => {
    console.log(err);
})

async function start() {

    await mongoose.connect(MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })

    startScrap()

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    })
}

start()
