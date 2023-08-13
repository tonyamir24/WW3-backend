const Challenge = require("../Modules/Challenge");
const Team = require("../Modules/Team");

const getChallenge = async (req, res) => {
  const { ID, TeamName } = req.body;
  try {
    const challenge = await Challenge.find({ ID });
    if (challenge.Coins === true) {
      console.log("hello");
      const team = await Team.findOneAndUpdate(
        { Name: TeamName },
        { $inc: { Coins: challenge.Value } }
      );
      await Challenge.findOneAndUpdate({ ID }, { Coins: false });
    }
    await res.status(200).json(challenge);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const createChallenge = async (req, res) => {
  const { ID, Message, Coins, Value } = req.body;
  try {
    const c = await Challenge.findOne({ ID });
    if (c) {
      throw Error("ID Already Taken");
    }
    const challenge = await Challenge.create({ ID, Message, Coins, Value });
    await res.status(200).json(challenge);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  getChallenge,
  createChallenge,
};
