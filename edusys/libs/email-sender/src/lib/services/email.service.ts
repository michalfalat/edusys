import * as Email from 'email-templates';
import * as path from 'path';
import * as nodemailer from 'nodemailer';
import { EmailTemplate, EmailType } from '../model/email.model';

export const buildAndSendEmail = (emailTemplate: EmailTemplate<EmailType>): Promise<any> => {
  const email = new Email({
    message: {
      from: `${process.env.EMAIL_USER}`,
      attachments: emailTemplate.attachments,
    },
    transport: {
      jsonTransport: true,
    },
    send: true,
    preview: false,
  });

  return email
    .send({
      template: path.resolve(`${__dirname}/assets/templates/${emailTemplate.lang}/${emailTemplate.template}`),
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
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  await transporter.sendMail({
    from: `${process.env.EMAIL_NICKNAME} <${process.env.EMAIL_USER}>`,
    to: emailMessage.originalMessage.to,
    subject: emailMessage.originalMessage.subject,
    text: emailMessage.originalMessage.text,
    html: emailMessage.originalMessage.html,
    attachments: emailMessage.originalMessage.attachments,
  });
};
