const Country = require("../Modules/Country");
const createCountry = async (req, res) => {
  const { Name, Price, Power, Type } = req.body;
  try {
    const c = await Country.findOne({ Name });

    if (c) {
      throw Error(Name + "  Already Craeted");
    }
    const country = await Country.create({ Name, Price, Power, Type });

    await res.status(200).json(country);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const viewcountry = async (req, res) => {
  const { Name } = req.params;
  try {
    const country = await Country.findOne({ Name });
    await res.status(200).json(country);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const viewCountries = async (req, res) => {
  // const {Name}=req.body
  try {
    const country = await Country.find();
    await res.status(200).json(country);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  createCountry,
  viewCountries,
  viewcountry,
};
