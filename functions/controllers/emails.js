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
    html: req.body.html
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      res.status(500).json({ message: "Send failed!"});
    } else {
      res.status(200).json({
        message: 'Send email successfully!',
        info: info
      });
    }
  });

  // console.log("Message sent: %s", info.messageId);
  
}

