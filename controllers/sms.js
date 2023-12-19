// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
import twilio from "twilio";
import { createInterface } from "readline";

const accountSid = "ACfbff430509be2f56ed0582c422ad5db6";
const authToken = "0b9ce61c68b1f0c91617eda6ffe70ab3";
const verifySid = "VAe57d92b2c9c4c98d91be178516090552";



const client = twilio(accountSid, authToken);

client.verify.v2.services(verifySid)
  .verifications.create({ to: "+265991281977", channel: "sms" })
  .then((verification) => console.log(verification.status))
  .then(async () => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const otpCode = await new Promise(resolve => rl.question("Please enter the OTP:", resolve));

    client.verify.v2.services(verifySid)
      .verificationChecks.create({ to: "+265991281977", code: otpCode })
      .then((verification_check) => console.log(verification_check.status))
      .finally(() => rl.close());
  });