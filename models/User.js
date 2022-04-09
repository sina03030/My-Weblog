const { Schema, model } = require('mongoose');
const {userValidation} = require('./secure/user-validation');
const userSchema = new Schema({
    fullname: {
        type: String,
        required: [true, 'fullname is required'],
        min: 3,
        max: 255
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        max: 255,
    },
    createAt: {
        type: Date,
        default: Date.now,
    }
});


userSchema.statics.userValidation = function (body) {
    return userValidation.validate(body, { abortEarly: false });
}

const User = model('User', userSchema);

module.exports = User;