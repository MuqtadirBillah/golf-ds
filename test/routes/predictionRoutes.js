const express = require("express");
const predictionController = require("../controllers/predictionController")
const predictionRouter = express.Router();

predictionRouter.route("/data").get(predictionController.predictData);

module.exports = predictionRouter;