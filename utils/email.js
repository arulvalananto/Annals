const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    // 1) Create a transporter

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // if True, use port 465
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // 2) Define the email Options

    const mailOptions = {
        from: "Arul Valan Anto",
        to: options.email,
        subject: options.subject,
        html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Document</title>
                    <style>
                        body {
                            color: "lightgray";
                            display: "flex";
                            flex-direction: "column";
                        }
                        span {
                            color: "blue";
                        }
                        .button {
                            color: "white";
                            background: "#010A24"
                        }
                    </style>
                </head>
                <body>
                    <p>Hello,</p>
                    <p>We received a request to reset the password for the Stripe account associated with <span> ${
                        options.user.email
                    }</span></p>
                    <a class="button" href=${`http://localhost:5000/api/v1/password/confirm-change-pin`}>Reset your password</a>
                    <p>If you didn’t request to reset your password, let us know by replying directly to this email. No changes were made to your account yet.</p>
                </body>
                </html>
                `,
    };

    //3) Send the email
    try {
        await transporter.sendMail(mailOptions);
    } catch (e) {
        return console.log(err);
    }
};

module.exports = sendEmail;
