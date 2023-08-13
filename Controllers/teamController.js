const Team = require("../Modules/Team");
const Country = require("../Modules/Country");
const Challenge = require("../Modules/Challenge");

const createTeam = async (req, res) => {
  const { Name, Password } = req.body;
  try {
    const t = await Team.findOne({ Name });
    if (t) {
      throw Error(Name + " name Already Taken");
    }
    const team = await Team.create({ Name, Password });
    await res.status(200).json(team);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const viewTeam = async (req, res) => {
  const { Name } = req.params;
  try {
    const team = await Team.findOne({ Name });
    await res.status(200).json(team);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const viewTeams = async (req, res) => {
  // const {Name}=req.body
  try {
    const teams = await Team.find();
    if (teams) await res.status(200).json(teams);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const addMembers = async (req, res) => {
  const { Name, MemberName, NickName, ID } = req.body;
  try {
    const team = await Team.findOneAndUpdate(
      { Name },
      { $push: { Members: { Name: MemberName, NickName, ID } } }
    );
    await res.status(200).json(team);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const updateCoins = async (req, res) => {
  const { Name, Coins } = req.body;
  try {
    const team = await Team.findOneAndUpdate(
      { Name },
      { $inc: { Coins: Coins } }
    );
    await res.status(200).json(team);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const updatePower = async (req, res) => {
  const { Name, Power } = req.body;
  try {
    const team = await Team.findOneAndUpdate(
      { Name },
      { $inc: { Power: Power } }
    );
    await res.status(200).json(team);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const assignCountry = async (req, res) => {
  const { TeamName, CountryName } = req.body;
  try {
    const team = await Team.findOne({ Name: TeamName });
    const country = await Country.findOne({
      Name: CountryName,
      TeamName: "none",
    });
    if (country) {
      if (team.Coins > country.Price) {
        const updatedTeam = await Team.findOneAndUpdate(
          { Name: TeamName },
          {
            Power: team.Power + country.Power,
            Coins: team.Coins - country.Price,
            $push: {
              Countries: { CountryName: country.Name, CountryID: country._id },
            },
          }
        );
        await Country.findOneAndUpdate(
          { Name: CountryName, TeamName: "none" },
          { TeamName: TeamName }
        );
        await res.status(200).json(updatedTeam);
      } else {
        throw Error("Not Enough Coins");
      }
    } else {
      throw Error("Country Taken");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const tradeCountry = async (req, res) => {
  const { TeamName1, TeamName2, CountryName, Price } = req.body;
  try {
    const team1 = await Team.findOne({ Name: TeamName1 });
    const team2 = await Team.findOne({ Name: TeamName2 });
    const country = await Country.findOne({
      Name: CountryName,
      TeamName: TeamName1,
    });
    if (country) {
      if (team2.Coins > Price) {
        const updatedTeam1 = await Team.findOneAndUpdate(
          { Name: TeamName1 },
          {
            Power: team1.Power - country.Power,
            Coins: team1.Coins + Price,
            $pull: { Countries: { CountryName: country.Name } },
          }
        );
        const updatedTeam2 = await Team.findOneAndUpdate(
          { Name: TeamName2 },
          {
            Power: team2.Power + country.Power,
            Coins: team2.Coins - Price,
            $push: {
              Countries: { CountryName: country.Name, CountryID: country._id },
            },
          }
        );
        const updatedCountry = await Country.findOneAndUpdate(
          { Name: CountryName, TeamName: TeamName1 },
          { TeamName: TeamName2 }
        );
        return await res.status(200).json(updatedCountry);
      } else {
        throw Error("Not Enough Coins");
      }
    } else {
      throw Error("Country Not Owned By This Team");
    }
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};
const attendance = async (req, res) => {
  const { ID } = req.body;
  try {
    const teams = await Team.find();

    teams?.map(async (team) => {
      team.Members?.map(async (member) => {
        if (member.ID === ID) {
          const t = await Team.findOneAndUpdate(
            { Name: team.Name },
            { $inc: { Coins: 10 } }
          );
          return await res.status(200).json(member);
        }
      });
    });
    throw Error("Person not found");
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = {
  createTeam,
  viewTeam,
  viewTeams,
  updateCoins,
  updatePower,
  addMembers,
  assignCountry,
  tradeCountry,
  attendance,
};
