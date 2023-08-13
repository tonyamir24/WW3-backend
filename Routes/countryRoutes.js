const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const {
  createCountry,
  viewCountries,
  viewcountry,
} = require("../Controllers/countryController");

router.get("/country/", viewCountries);
router.get("/country/:Name", createCountry);
router.post("/country", createCountry);

module.exports = router;
