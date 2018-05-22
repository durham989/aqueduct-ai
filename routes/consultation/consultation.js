var express = require('express');
var router = express.Router();
var sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/submit', function (req, res) {
  const leadFirstName = req.body.consultFirstName;
  const leadLastName = req.body.consultLastName;
  const leadEmailAddress = req.body.consultEmailAddress;
  const leadOrgName = req.body.consultOrgName;

  const msg = {
    to: ['ethan@kasuriagroup', 'jeff@kasuriagroup'],
    from: 'info@aqueduct.ai',
    subject: 'Test Consultation Submission',
    html: `<p>The following individual just submitted a consultation form on Aqueduct.ai:</p><p><ul><li>First Name: ${leadFirstName}</li><li>Last Name: ${leadLastName}</li><li>Email Address: ${leadEmailAddress}</li><li>Org Name: ${leadOrgName}</li></ul></p><p>Follow up with them ASAP!</p>`
  };

  sgMail.send(msg);

});

module.exports = router;
