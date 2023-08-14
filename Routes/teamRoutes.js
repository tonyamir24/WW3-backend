const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const {
  createTeam,
  viewTeam,
  viewTeams,
  updateCoins,
  updatePower,
  addMembers,
  assignCountry,
  tradeCountry,
  attendance,
  getMember,
} = require("../Controllers/teamController");

router.get("/teams/", viewTeams);
router.get("/teams/:Name", viewTeam);
router.post("/teams", createTeam);
router.put("/updateCoins", updateCoins);
router.put("/updatePower", updatePower);
router.put("/addMembers", addMembers);
router.put("/assignCountry", assignCountry);
router.put("/tradeCountry", tradeCountry);
router.put("/attendance", attendance);
router.get("/member", getMember);

module.exports = router;
