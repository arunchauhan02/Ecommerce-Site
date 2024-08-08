const nodemailer = require("nodemailer")

const sendEmail = async (options)=>{
    const Transporter = nodemailer.createTransport({
        service:process.env.SMPT_SERVICE,
        secure:true,
        port:465,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD,
        },
    })


    const mailOptions = {
        from:process.env.SMPT_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message
    }
    console.log(mailOptions)

    let resp = await Transporter.sendMail(mailOptions)
    console.log(resp)
}

module.exports = sendEmail