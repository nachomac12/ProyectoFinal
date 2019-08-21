const mailer = require('nodemailer');
const { bienvenido } = require('./bienvenido'); 
require('dotenv').config();

const getEmailData = (to, nombre, token, tipo) => {
    let data = null;
    switch (tipo) {
        case "bienvenida":
            data = {
                from: "Redemplear <redemplear@hotmail.com>",
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
        service: 'Hotmail',
        auth: {
            user: "redemplear@hotmail.com",
            pass: "maiden9513"
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