const mailer = require('nodemailer');
const { bienvenido } = require('./bienvenido'); 
require('dotenv').config();

const getEmailData = (to, nombre, token, tipo) => {
    let data = null;
    switch (tipo) {
        case "bienvenida":
            data = {
                from: "Redemplear <samaproject.enterprise@gmail.com>",
                to,
                subject: `¡Bievenido a Redemplear, ${nombre}!`,
                html: bienvenido()
            }
        break;
        default:
            data;
    }

    return data;
}


const enviarEmail = (to, nombre, token, tipo) => {

    const smtpTransport = mailer.createTransport({
        service: 'Gmail',
        auth: {
            user: "samaproject.enterprise@gmail.com",
            pass: process.env.EMAIL_PASS
        }
    });

    const mail = getEmailData(to, nombre, token, tipo);

    smtpTransport.sendMail(mail, function(error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log('email enviado');
        };
        smtpTransport.close();
    });

}

module.exports = { enviarEmail }