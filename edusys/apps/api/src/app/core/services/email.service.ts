import * as Email from 'email-templates';
import * as path from 'path';
import * as nodemailer from 'nodemailer';
import { __basedir } from '../../../dir';
import { EmailTemplate } from '@edusys/model';

export const sendEmail = (emailTemplate: EmailTemplate<any>): Promise<any> => {
  const email = new Email({
    message: {
      from: `${process.env.EMAIL_USER}`,
    },
    transport: {
      jsonTransport: true,
    },
    send: true,
    preview: false,
  });

  return email
    .send({
      template: path.resolve(__basedir + `/assets/emails/${emailTemplate.lang}/${emailTemplate.template}`),
      message: {
        to: emailTemplate.to,
      },
      locals: {
        ...emailTemplate.params,
      },
    })
    .then(send);
};

const send = async (emailMessage: any): Promise<any> => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: `${process.env.EMAIL_NICKNAME} <${process.env.EMAIL_USER}>`,
    to: emailMessage.originalMessage.to,
    subject: emailMessage.originalMessage.subject,
    text: emailMessage.originalMessage.text,
    html: emailMessage.originalMessage.html,
  });
  console.log(info);
};
