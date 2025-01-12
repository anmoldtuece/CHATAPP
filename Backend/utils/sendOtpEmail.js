import nodemailer from "nodemailer";


const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "vibeconnect05@gmail.com",
      pass: "itio envw mchm flxq",
    },
  });

  const mailOptions = {
    from: "vibeconnect05@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: "Your OTP code is ${otp}. It will expire in 5 minutes.",
  };

  await transporter.sendMail(mailOptions);
};

export default sendOtpEmail;