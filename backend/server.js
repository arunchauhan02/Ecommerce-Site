const app = require("./app");
const connectdatabase = require("./config/database")
const cloudinary  = require("cloudinary").v2;


//handleing uncaught exception console.log(youtube)
process.on("uncaughtException",(err)=>{
    console.log(`Error ${err.message}`);
    console.log(`server is shutting down due to uncaught exception`)
    
    server.exit(1);
})

if(process.env.NODE_ENV !== "PRODUCTION"){
    require('dotenv').config({path:"backend/config/config.env"});
}


connectdatabase();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working at https:\\localhost:${process.env.PORT}`)
})

//unhandled server rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error ${err.message}`);
    console.log(`server is shutting down due to unhandled server rejection`)
    server.close(()=>{
        server.exit(1);
    });
})