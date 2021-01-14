const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("./utils/logger");
const { notFound, errorHandler } = require("./utils/middlewares");

const app = express();
app.use(morgan("common"));
app.use(helmet());
app.use(
    cors({
        origin: "http://localhost:3000"
    })
);

app.get("/", (req, res) => {
    res.json({
        message: "Hello! 👋"
    });
});

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, logger.info(`Listening on http://localhost:${port}`));
