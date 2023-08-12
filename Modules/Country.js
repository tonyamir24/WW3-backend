const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({

  Name: {
    type: String,
    required: true,
  },
Price:{
    type: Number,
    required: true,
}  ,
Power:{
    type: Number,
    required: true,
} ,
Type:{
    type: Number,
    required: true,
} ,
TeamName:{
    type: String,
    required: true,
    default:"none"
}
}, { timestamps: true });

const Country = mongoose.model('Country', countrySchema);
module.exports = Country;