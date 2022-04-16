const User = require('../models/User');
const { userValidation } = require('../models/secure/user-validation');
const bcryptjs = require('bcryptjs');
const passport = require('passport');

exports.register = (req, res) => {
    res.render('register', { pageTitle: 'registeration page', path: '/register' });
};

const salt = 10;
exports.createUser = async (req, res) => {
    const errArr = [];
    try {
        const { fullname, email, password } = req.body;
        await userValidation.validate(req.body);
        const duplicatedUser = await User.findOne({ email });
        if (duplicatedUser) {
            errArr.push({ message: 'user with this email already exist' });
            throw errArr;
        }
        const passHash = bcryptjs.hashSync(password, salt);
        await User.create({
            email, fullname, password: passHash
        });
        req.flash('success_msg', 'Successfully registered');
        return res.redirect('/users/login');
    } catch (err) {
        console.log(err);

        // pushing errors to array 
        try {
            err.inner.forEach(element => errArr.push({ name: element.path, message: element.message, }));
            err.errors.forEach(element => errArr.push({ name: '', message: element }));
        } catch (err) { }
        res.render('register', {
            pageTitle: 'registration page',
            path: '/register',
            errors: errArr,
        });
    }
};

exports.login = (req, res) => {
    res.render('login', { pageTitle: 'login page', path: '/login', message: req.flash('success_msg'), error: req.flash('error'),});
}

exports.handleLogin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/user/login',
        failureFlash: true,
    })(req, res, next);
}