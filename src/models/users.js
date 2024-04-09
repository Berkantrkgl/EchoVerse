const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = Schema({
    first_name: { type: String, required: [true, 'User must have a first name!'] },
    last_name: { type: String, required: true },
    user_name: { type: String, required: true },
    e_mail: { type: String, required: true },
    password: {type : String, required: true },
    words: [{ type: Schema.Types.ObjectId, ref: 'Word'}],
});

var User = mongoose.Model('User', userSchema);

module.exports = User;