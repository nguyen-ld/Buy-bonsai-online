const multer = require("multer");

const _storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "src/public/upload");
	},
	filename: function (req, file, cb) {
		cb(null, `${file.originalname}-${Date.now()}`);
	},
});
const upload = multer({
	storage: _storage,
	limits: {
		fieldSize: 5 * 1024 * 1024,
	},
});

module.exports = upload;
