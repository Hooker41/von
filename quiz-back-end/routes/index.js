var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const creds = require('../config/config');

var transport = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/send', (req, res, next) => {
  var data = req.body.data
  var email = req.body.email
  var content = `Attachment is quiz result`

  var mail = {
    from: 'VON THUNEN',
    to: email,
    subject: 'Quiz Result',
    text: content,
    attachments: [
      {   // utf-8 string as an attachment
        filename: 'quiz_result.pdf',
        content: data,
        encoding: 'base64'
      },
    ]
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log({err})
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})

module.exports = router;
