const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  try {
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          console.log("*ERR: ", err);
          reject();
        }
        resolve(token);
      });
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "oauth2",
        user: process.env.GMAIL,
        accessToken,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    });
    return transporter;
  } catch (err) {
    return err;
  }
};

const sendMail = async (name, email, authToken) => {
  try {
    const mailOptions = {
      from: process.env.GMAIL,
      to: email,
      subject: "Test - Verify your account",
      html: `<p>Dear <b>${name}</b> Click <a href="http://localhost:3000/api/verify/${authToken}">here</a> to verify your account. or <br />
      <a href="http://localhost:3000/api/verify/${authToken}">http://localhost:3000/api/verify/${authToken}" </a>
      </p>`,
    };

    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail(mailOptions);
  } catch (err) {
    console.log("ERROR: ", err);
  }
};

module.exports = { sendMail };
