const User = require('../models/User');

exports.register = (req, res) => {
    res.render('register', { pageTitle: 'registeration page', path: '/register' });
};

exports.createUser = async (req, res) => {
    try {
        await User.userValidation(req.body);
        // await User.create(req.body);
        return res.redirect('/users/login');
    } catch (err) {
        console.log(err);
        const errArr = [];
        err.inner.forEach(element => {
            errArr.push({
                name: element.path,
                message: element.message,
            })
        });
        res.render('register', {
            pageTitle: 'registration page',
            path: '/register',
            errors: errArr,
        });
    }
};

exports.login = (req, res) => {
    res.render('login', { pageTitle: 'login page', path: '/login' });
}