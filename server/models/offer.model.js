const mongoose = require('mongoose');
var OfferSchema = new mongoose.Schema({
  term: String,
  expiry: String,
  eth: Number,
  desc: String,
  creator_id: String,
  created_date: { type: Date, default: Date.now },
  opponent_id: String,
  opponent_eth: String,
  winner_id: String,
  contest_desc: String,
  dispute_flag: String,
  contestor_id: {type:String, default:"" },
  contest_date: {type:Date, default: Date.now },
  offer_status: {type:String, default:"" }
});
Offer = mongoose.model('Offer', OfferSchema);
module.exports = Offer;