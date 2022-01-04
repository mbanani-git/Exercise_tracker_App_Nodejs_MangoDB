const express = require("express");

const router = express.Router();

const { getInfo, postUsername, postExo, getLogs, getAllUsers } = require("../controllers/controller");

router.post("/api/users", postUsername);
router.post("/api/users/:_id/exercises", postExo);
router.post("/api/users/:_id/logs", getLogs);
router.get("/api/users/:_id/logs", getInfo);
router.get("/api/users", getAllUsers);
module.exports = router;
