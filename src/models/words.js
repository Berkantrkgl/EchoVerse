const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var wordSchema = new Schema({
    en_word: { type: String, required: true, lowercase: true },
    tr_word: { type: String, required: true, lowercase: true },
    //creator: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    entry_date: { type: Date, default: Date.now },
    is_active: { type: Boolean, default: true },
    number_of_seen: { type: Number, default: 1 },
});

var Word = mongoose.model("Word", wordSchema);

module.exports = Word;
