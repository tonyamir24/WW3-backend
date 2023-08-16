const Challenge = require("../Modules/Challenge");
const Team = require("../Modules/Team");

const getChallenge = async (req, res) => {
  const { ID, TeamName } = req.body;
  try {
    const challenge = await Challenge.findOne({ ID });
    if (challenge.Reward) {
      if (challenge.Reward === true) {
        if (challenge.Value > 0) {
          const team = await Team.findOneAndUpdate(
            { Name: TeamName },
            { $inc: { Coins: challenge.Value } }
          );
        }
        await Challenge.findOneAndUpdate({ ID }, { Reward: false });
      } else {
        throw Error("Qr Scanned Before");
      }
    } else {
      throw Error("Not a Valid QR Code (Msh hata5od attendance mn hena)");
    }

    await res.status(200).json(challenge);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const createChallenge = async (req, res) => {
  const { ID, Message, Reward, Value } = req.body;
  try {
    const c = await Challenge.findOne({ ID });
    if (c) {
      throw Error("ID Already Taken");
    }
    const challenge = await Challenge.create({ ID, Message, Reward, Value });
    await res.status(200).json(challenge);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  getChallenge,
  createChallenge,
};
