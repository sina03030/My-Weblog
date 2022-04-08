const { Schema, model } = require('mongoose');

const userSchema = new Schema();

const user = model('User', userSchema);

module.exports = user;