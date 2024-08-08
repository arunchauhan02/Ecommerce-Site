const mongoose = require('mongoose');

const connectdatabase = ()=>{
    try {
        
        mongoose.connect(process.env.DB_URI).then((data)=>{
            console.log(`Successfully connected https://localhost:${process.env.DB_URI}`)
        })
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = connectdatabase;