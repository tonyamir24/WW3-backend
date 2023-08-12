const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  
  
  Name: {
    type: String,
    required: true,
  },
 Password:{
    type: String,
    required: true,
 },
  Members: {
   type: [{Name:String,NickName:String,ID:Number}],
   required: true,
   default : []
  },
  Countries: {
    type: [{CountryName:String,CountryID:String}],
    required: true,
    default : []
   },
  Coins:{
    type:Number,
    required: true,
    default : 0
  },
  Power:{
    type:Number,
    required: true,
    default : 0
  },
  
}, { timestamps: true });

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;