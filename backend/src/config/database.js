const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("buy_bonsai_online", "root", null, {
	host: "localhost",
	dialect: "mysql",
});
let connect_database = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};
module.exports = { connect_database };
