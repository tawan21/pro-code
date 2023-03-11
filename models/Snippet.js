const mongoose = require('mongoose');
const { Schema } = mongoose;
const SnippetSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Snippet = mongoose.model('snippet', SnippetSchema);
module.exports = Snippet