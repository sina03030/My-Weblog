const { Schema, model } = require('mongoose');
const bcryptjs = require('bcryptjs');

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

userSchema.pre('save', function(next){
    console.log('save called in User.js line 36');
    let user = this;

    if(!user.isModified('password')) return next();

    bcryptjs.hash(user.password, 10, (err, hash)=>{
        if(err) return next(err);

        user.password = hash;
        next();
    });
});

const User = model('User', userSchema);

module.exports = User;