require("dotenv").config({ path: "config/.env" });
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

const logger = require("./utils/logger");
const { notFound, errorHandler } = require("./utils/middlewares");
const logRoutes = require("./api/logRoutes");

const app = express();

// Middleware
app.use(morgan("common"));
app.use(helmet());
app.use(
    cors({
        origin: process.env.CORS_ORIGIN
    })
);
app.use(express.json());

// Database
mongoose
    .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(logger.info("Database connected!"))
    .catch((err) => logger.error(err));

// Routes
app.get("/", (req, res) => {
    res.json({
        message: "Hello! 👋"
    });
});
app.use("/api/logs", logRoutes);

// Custom Middleware
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, logger.info(`Listening on http://localhost:${port}`));
