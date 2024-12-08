const axios = require("axios");
const {
  MailerSend,
  EmailParams,
  Sender,
  Recipient,
  Attachment,
} = require("mailersend");

const mailersend = new MailerSend({
  apiKey: process.env.SENDGRIND_TOKEN,
});

const PDF_SERVICE = process.env.PDF_SERVICE;

function paqueteriaHTML(data) {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro de Solicitud de Paquetería</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            line-height: 1.6;
        }
        .container {
            border: 1px solid #ddd;
            padding: 20px;
            border-radius: 8px;
            max-width: 600px;
            margin: auto;
        }
        h1 {
            text-align: center;
            color: #333;
        }
        .info {
            margin-bottom: 10px;
        }
        .info span {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Registro de Solicitud de Paquetería</h1>
        <p>Hemos recibido un registro de solicitud de paquetería con los siguientes datos:</p>
        <div class="info">
            <span>Proyecto:</span> ${data.proyecto}
        </div>
        <div class="info">
            <span>Paquetería:</span> ${data.paqueteria}
        </div>
        <div class="info">
            <span>Dirección:</span> ${data.direccion}
        </div>
        <div class="info">
            <span>Contacto:</span> ${data.contacto}
        </div>
        <div class="info">
            <span>Email de Contacto:</span> ${data.emailContacto}
        </div>
        <div class="info">
            <span>Empresa de Envío:</span> ${data.empresaEnvio}
        </div>
        <div class="info">
            <span>Estado del Envío:</span> ${data.shipping_status}
        </div>
        <div class="info">
            <span>Última Actualización:</span> ${data.lastUpdate}
        </div>
    </div>
</body>
</html>
    `;
}

module.exports = {
  sendNotification: async (type, payload) => {
      const messages = {
      paqueteria: paqueteriaHTML,
    };

    const subject = {
      paqueteria: "Notificación de Solicitud de Paquetería",
    };

    let attachments = null;
    if (type === "paqueteria") {
      const data = {
        id: payload._id,
        is_active: true,
        proyecto: payload.proyecto,
        paqueteria: payload.paqueteria,
        direccion: payload.direccion,
        contacto: payload.contacto,
        numeroContacto: payload.numeroContacto,
        emailContacto: payload.emailContacto,
        empresaEnvio: payload.empresaEnvio,
        shipping_status: payload.shipping_status,
        numeroContacto_recibe: payload.numeroContacto_recibe,
        contacto_recibe: payload.contacto_recibe,
        contacto_recibe_email: payload.contacto_recibe_email,
        createdAt: payload.createdAt,
        updatedAt: payload.updatedAt,
        codigo: payload.codigo,
      };

      const response = await axios.post(
        `${PDF_SERVICE}/reporte/paqueteria`,
        data,
        {
          responseType: "arraybuffer",
        },
      );
      const pdfbase64 = Buffer.from(response.data, "base64").toString("base64");
      attachments = [
        new Attachment(pdfbase64, "reporte-paqueteria.pdf", "attachment"),
      ];
    }

    const recipientSender = new Recipient(
      "rluna@grupointecsa.com",
      "Roger Luna",
    );

    //const recipient = new Recipient(
    //  payload.contacto_recibe_email,
    //  payload.contacto_recibe,
    //);

    const sentFrom = new Sender("contacto@grupointecsa.com", "Grupo Intecsa");
    try {
      const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo([recipientSender])
        .setReplyTo(sentFrom)
        .setSubject(subject[type] + " en Grupo Intecsa")
        .setHtml(messages[type](payload))
        .setAttachments(attachments);

      const response = await mailersend.email.send(emailParams);
      return response;
    } catch (error) {
      return error;
    }
  },
};
