const nodemailer = require('nodemailer');
const createHttpError = require('../utils/createHttpError');

function createEmailTransporter() {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    throw createHttpError(
      'Email service is not configured. Please set EMAIL_USER and EMAIL_PASS in .env.',
      500
    );
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });
}

async function sendVerificationEmail({ to, fullName, verificationToken }) {
  if (!to) {
    throw createHttpError('Recipient email is required.', 500);
  }

  if (!verificationToken) {
    throw createHttpError('Verification token is required.', 500);
  }

  const transporter = createEmailTransporter();
  const verifyUrl = `http://localhost:5173/verify-email?token=${verificationToken}`;

  await transporter.sendMail({
    from: `"MD Creative" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Verify your MD Creative account',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 24px; background: #fffaf4; color: #1a120b;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #eee2cf; border-radius: 16px; padding: 32px;">
          <h2 style="margin-top: 0; color: #1a120b;">Verify your account</h2>

          <p>Hello ${fullName || 'there'},</p>

          <p>
            Thank you for registering at <strong>MD Creative</strong>.
            Please verify your email address to activate your account.
          </p>

          <div style="margin: 24px 0;">
            <a
              href="${verifyUrl}"
              style="
                display: inline-block;
                padding: 12px 20px;
                background: #c8841a;
                color: #ffffff;
                text-decoration: none;
                border-radius: 10px;
                font-weight: bold;
              "
            >
              Verify Email
            </a>
          </div>

          <p style="margin-bottom: 8px;">
            If the button does not work, copy and paste this link into your browser:
          </p>

          <p style="word-break: break-all; color: #7a6a52;">
            ${verifyUrl}
          </p>

          <hr style="border: none; border-top: 1px solid #eee2cf; margin: 24px 0;" />

          <p style="font-size: 14px; color: #7a6a52; margin-bottom: 0;">
            If you did not create this account, you can safely ignore this email.
          </p>
        </div>
      </div>
    `,
  });
}
async function sendResetPasswordEmail({ to, fullName, resetToken }) {
  if (!to) {
    throw createHttpError('Recipient email is required.', 500);
  }

  if (!resetToken) {
    throw createHttpError('Reset password token is required.', 500);
  }

  const transporter = createEmailTransporter();
  const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}`;

  await transporter.sendMail({
    from: `"MD Creative" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Reset your MD Creative password',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 24px; background: #fffaf4; color: #1a120b;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #eee2cf; border-radius: 16px; padding: 32px;">
          <h2 style="margin-top: 0; color: #1a120b;">Reset your password</h2>

          <p>Hello ${fullName || 'there'},</p>

          <p>
            We received a request to reset your password for your <strong>MD Creative</strong> account.
          </p>

          <div style="margin: 24px 0;">
            <a
              href="${resetUrl}"
              style="
                display: inline-block;
                padding: 12px 20px;
                background: #c8841a;
                color: #ffffff;
                text-decoration: none;
                border-radius: 10px;
                font-weight: bold;
              "
            >
              Reset Password
            </a>
          </div>

          <p style="margin-bottom: 8px;">
            If the button does not work, copy and paste this link into your browser:
          </p>

          <p style="word-break: break-all; color: #7a6a52;">
            ${resetUrl}
          </p>

          <hr style="border: none; border-top: 1px solid #eee2cf; margin: 24px 0;" />

          <p style="font-size: 14px; color: #7a6a52; margin-bottom: 0;">
            If you did not request a password reset, you can safely ignore this email.
          </p>
        </div>
      </div>
    `,
  });
}

module.exports = {
  sendVerificationEmail,
  sendResetPasswordEmail,
};