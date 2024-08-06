const mongoose = require('mongoose');

const connectdatabase = ()=>{
    mongoose.connect(process.env.DB_URI).then((data)=>{
        console.log(`Successfully connected https://localhost:${process.env.DB_URI}`)
    })
    
}

module.exports = connectdatabase;