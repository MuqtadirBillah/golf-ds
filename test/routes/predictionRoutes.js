const express = require("express");
const predictionController = require("../controllers/predictionController")
const predictionRouter = express.Router();

predictionRouter.route("/data").get(predictionController.predictData);
predictionRouter.route("/classify").get(predictionController.classifyData);

module.exports = predictionRouter;