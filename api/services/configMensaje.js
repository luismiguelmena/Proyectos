const nodemailer = require('nodemailer');


function enviarMensaje(usuario, carrito) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'comprasluismiguelmena@gmail.com', // Cambialo por tu email
            pass: 'ranarei3' // Cambialo por tu password
        }

    });

    const mailOptions = {
        from: 'Cinemaki',
        to: usuario.email, // Cambia esta parte por el destinatario
        subject: 'Entradas Cine',
        html: 'Ha realizado su pago correctamente, aqui tiene el recibo de su pago \n Aquí tiene su identificador de comprar: 5dc30889ecbe6372bd7f11f4'
    };
    transporter.sendMail(mailOptions, function(err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}
module.exports = {
    enviarMensaje
}