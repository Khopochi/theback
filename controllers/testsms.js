// Express server setup
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Configure middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Twilio setup (replace with your Twilio credentials)
const accountSid = "your_account_sid";
const authToken = "your_auth_token";
const verifySid = "your_verify_service_sid";
const client = require("twilio")(accountSid, authToken);

// Route for user registration and OTP verification
app.post("/register", async (req, res) => {
  try {
    const phoneNumber = req.body.phoneNumber;

    // Start phone number verification
    const verification = await client.verify.v2.services(verifySid)
      .verifications.create({ to: phoneNumber, channel: "sms" });

    console.log(`Verification status: ${verification.status}`);

    // Send a response indicating successful initiation
    res.json({ status: "success", message: "Verification initiated" });
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

// Route for OTP verification
app.post("/verify-otp", async (req, res) => {
  try {
    const phoneNumber = req.body.phoneNumber;
    const otpCode = req.body.otpCode;

    // Check the entered OTP
    const verificationCheck = await client.verify.v2.services(verifySid)
      .verificationChecks.create({ to: phoneNumber, code: otpCode });

    console.log(`Verification check status: ${verificationCheck.status}`);

    // Send a response indicating the verification result
    res.json({ status: verificationCheck.status });
  } catch (error) {
    console.error("Error during OTP verification:", error.message);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
