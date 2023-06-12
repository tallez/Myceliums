import * as nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD,
  },
  host: 'smtp.gmail.com', // Use the correct hostname
  port: 465, // SMTP secure port
  secure: true // Use SSL/TLS
});

export async function sendEmail(to: string, subject: string, text: string, html: string) {
  // send mail with defined transport object
  await transporter.sendMail({
    from: "Myceliums", // sender address
    to, // list of receivers
    subject, // Subject line
    text,
    html
  })
}
