import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import ENV from '../config.js';

let nodeConfigCreator = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: ENV.EMAIL,
        pass: ENV.PWD, 
    }
}

let transporter = nodemailer.createTransport(nodeConfigCreator);

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: 'https://mailgen.js/'
    }
});

export const registerMail = async (req, res) => {
    const { name,mail, text, subject } = req.body;

    const email = {
        body: {
            name: name,
            intro: text || 'Welcome to our application!',
            outro: 'Thank you for using our services.',
        }
    };

    const emailBody = MailGenerator.generate(email);

    const message = {
        from: ENV.EMAIL,
        to: mail,
        subject: subject || "Signup Successful",
        html: emailBody,
    };

    transporter.sendMail(message)
        .then(() => {
            return res.status(200).send({ msg: "You should receive an email from us." });
        })
        .catch(error => res.status(500).send({ error }));
};