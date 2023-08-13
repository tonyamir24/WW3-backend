const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const {
  getChallenge,
  createChallenge,
} = require("../Controllers/challengeController");

router.put("/challenge", getChallenge);
router.post("/challenge", createChallenge);
module.exports = router;
