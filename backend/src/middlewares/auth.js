const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
	try {
		const authHeaders = req.headers["authorization"];
		if (!authHeaders) {
			return res.status(401).json({
				status: 401,
				message: "Bạn chưa đăng nhập",
			});
		}

		console.log(authHeaders);

		const token = authHeaders.split(" ")[1];

		if (!token) {
			return res.status(403).json({
				status: 403,
				message: "Token không hợp lệ",
			});
		}

		jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
			if (err) {
				return res.status(401).json({
					status: 401,
					message: "Token hết hạn",
				});
			}

			req.user = decoded;
			next();
		});
	} catch (error) {
		console.log(error);
		res.json({
			status: 500,
			message: error.message,
		});
	}
};

module.exports = { verifyToken };
