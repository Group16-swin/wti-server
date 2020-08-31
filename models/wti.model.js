const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wtiSchema = new Schema({
  id: { type: String, required: true },
  wti: { type: Number, required: true },
}, {
  timestamps: true,
});

const Wti = mongoose.model('Wti', wtiSchema);

module.exports = Wti;
