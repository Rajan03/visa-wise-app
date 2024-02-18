import { env } from "@/env";
import nodemailer from "nodemailer";

type LoginCredentials = {
  username: string;
  password: string;
};

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = this.emailTransporter();
  }

  private emailTransporter() {
    return env.ENV === "production"
      ? nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: env.NODEMAILER_EMAIL,
            pass: env.NODEMAILER_PW,
          },
        })
      : nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: env.NODEMAILER_EMAIL,
            pass: env.NODEMAILER_PW,
          },
        });
  }

  async sendLoginCredMail(toEmail: string, data: LoginCredentials): Promise<Error | any> {
    return (await new Promise((resolve, reject) => {
      this.transporter.sendMail(
        {
          from: env.NODEMAILER_EMAIL,
          to: toEmail,
          subject: "Login Credentials",
          html: emailTemplateForLoginCredentials(data),
        },
        (error, info) => {
          error ? reject(error) : resolve(info);
        }
      );
    }));
  }
}

// Email Templates
const emailTemplateForLoginCredentials = (data: LoginCredentials) => {
  return `
    <h1>Login Credentials</h1>
    <p>Username: ${data.username}</p>
    <p>Password: ${data.password}</p>
    `;
};

export const emailService = Object.freeze(new EmailService());