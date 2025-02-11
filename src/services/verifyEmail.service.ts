import nodemailer from 'nodemailer';
const EMAIL_VERIFICATION_LINK = process.env.EMAIL_VERIFICATION_LINK;
const TRANSPORTER_EMAIL_USER = process.env.TRANSPORTER_EMAIL_USER;
const TRANSPORTER_EMAIL_PASSW = process.env.TRANSPORTER_EMAIL_PASSW;

export const sendVerificationEmail = async (email: string, token: string) => {
	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: TRANSPORTER_EMAIL_USER,
				pass: TRANSPORTER_EMAIL_PASSW
			}
		});
		const verificationLink = `${EMAIL_VERIFICATION_LINK}?token=${token}`;
		const mailOptions = {
			from: TRANSPORTER_EMAIL_USER,
			to: email,
			subject: 'Email verification',
			html: `<p>Please verify your email by clicking the following link:</p><a href="${verificationLink}">Verify Email</a>`
		};

		await transporter.sendMail(mailOptions);
	} catch (error) {
		throw new Error(`Error while verifying email: ${JSON.stringify(error)}`);
	}
};
