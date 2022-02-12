const twilio = require('twilio');
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const SendTwilioSMS = async (mobile_number, message) => {
    return client.messages
    .create({
      body: message,
      to: mobile_number, // Text this number
      from: process.env.TWILIO_PHONE, // From a valid Twilio number
    })
};

module.exports = { SendTwilioSMS };
