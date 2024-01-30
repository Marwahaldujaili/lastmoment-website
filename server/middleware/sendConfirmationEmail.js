import nodemailer from "nodemailer";

const FRONT_END_URL = "http://localhost:5000";

export const sendConfirmationEmail = (email, confirmationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "aldujailimarwa@gmail.com",
      pass: "hxoeezqvcrrhgywo",
    },
  });

  const confirmationLink = `${FRONT_END_URL}/user/admin/confirm/${confirmationToken}`;

  const mailOptions = {
    from: "aldujailimarwa@gmail.com",
    to: email,
    subject: "Email Confirmation",
    html: `Click <a href="${confirmationLink}">here</a> to confirm your email.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending confirmation email:", error);
    } else {
      console.log("Confirmation email sent:", info.response);
    }
  });
};
