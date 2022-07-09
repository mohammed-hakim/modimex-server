import { resetPassTemplate } from './resetPass.template';
import nodemailer from 'nodemailer';

export async function sendEmail(to: string, text: string) {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'godev88pro@gmail.com',
      pass: 'hakimdev88$$2',
    },
  });

  let info = await transporter.sendMail({
    from: '"modimex shop ✨" <godev88pro@gmail.com>', // sender address
    to, // list of receivers
    subject: 'reset-password', // Subject line
    // text, // plain text body
    html: resetPassTemplate(text), // html body
  });
}
