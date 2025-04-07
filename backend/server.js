const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const { engine } = require("express-handlebars");
const cookieParser = require("cookie-parser");

//import
const api = require("./src/router/api");
const database = require("./src/config/database");
database.connect_database();

const port = process.env.PORT || 8000;

// set view enginew
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "src\\views"));

app.use(cookieParser());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(express.static(path.join(__dirname, "src\\public")));

app.get("/", async (req, res) => {
	res.render("home");
});

/// request
app.use("/api", api);

app.listen(port, () => {
	console.log(`application is listening on port : ${port}`);
});
module.exports = app;
