import nodemailer from "nodemailer";

export const sendConfirmationEmail = (email, confirmationToken) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SRV,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const confirmationLink = `${process.env.FRONT_END}/user/admin/confirm/${confirmationToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
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
