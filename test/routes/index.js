const { Router: expressRouter } = require("express");
const router = expressRouter();

// auth routes
const authRouter = require("./authRoutes");
router.use("/auth", authRouter);

// prediction routes
const predictionRouter = require("./predictionRoutes");
router.use("/predict", predictionRouter);

module.exports = router;