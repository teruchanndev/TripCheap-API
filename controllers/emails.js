const Email = require("../models/email");
const nodemailer = require("nodemailer");

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendEmail = (req, res, next) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.googlemail.com', // Gmail Host
    port: 465, // Port
    secure: true, // this is true as port is 465
    auth: {
      user: 'tripcheap.pay@gmail.com', // generated ethereal user
      pass: 'Huong_18021999', // generated ethereal password
    },
  });

  var mailOptions = {
    from: '"Tripcheap" <tripcheap.pay@gmail.com>',
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.html
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  console.log("Message sent: %s", info.messageId);
  
}

