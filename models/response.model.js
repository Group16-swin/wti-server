const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const responseSchema = new Schema({
  username: { type: String, required: true },
  past: { type: Number, required: true },
  future: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
