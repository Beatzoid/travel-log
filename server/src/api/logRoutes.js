const { Router } = require("express");
const LogEntry = require("../models/LogEntry");

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const entries = await LogEntry.find();
        res.json(entries);
    } catch (error) {
        // Forward to error handler
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const logEntry = new LogEntry(req.body);
        const createdEntry = await logEntry.save();
        res.json(createdEntry);
    } catch (error) {
        // Forward to error handler
        if (error.name === "ValidationError") res.status(422);
        next(error);
    }
});

module.exports = router;
