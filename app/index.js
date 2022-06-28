const express = require("express");
const morgan = require("morgan");
const cors = require('cors')
const router = require("../config/routes");

const app = express();

/** Install request logger */
app.use(morgan("dev"));

/** Install cors */
app.use(cors());

/** Install JSON request parser */
app.use(express.json());

/** Install Router */
app.use(router);

module.exports = app;
