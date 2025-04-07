const nodeMailer = require("nodemailer");
const tranposter = nodeMailer.createTransport({
	service: "gmail",
	auth: {
		user: "nguyenldpd10357@gmail.com",
		pass: process.env.KEY_PASS_SEND_OTP,
	},
});
module.exports = tranposter;
