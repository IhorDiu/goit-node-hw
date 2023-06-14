// const Mailjet = require("node-mailjet");

// require("dotenv").config();

// const { MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE, MJ_SENDER_EMAIL } = process.env;

// const mailjet = new Mailjet({
//   apiKey: MJ_APIKEY_PUBLIC,
//   apiSecret: MJ_APIKEY_PRIVATE,
// });

// const sendEmail = async (data) => {
//   await mailjet.post("send", { version: "v3.1" }).request({
//     Messages: [
//       {
//         From: {
//           Email: MJ_SENDER_EMAIL,
//         },
//         To: [
//           {
//             Email: data.to,
//           },
//         ],
//         Subject: data.subject,
//         HTMLPart: data.html,
//       },
//     ],
//   });
//   return true;
// };

// module.exports = sendEmail;


const nodemailer = require('nodemailer');

const { UKRNET_USER, UKRNET_PASSWORD } = process.env;

const nodemailerConfig = {
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: UKRNET_USER,
    pass: UKRNET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: UKRNET_USER };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;
