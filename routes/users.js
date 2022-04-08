const { Router } = require('express');

const router = new Router();

// @desc    Login Page
// @route   Get /users/login
router.get('/login', (req, res) => {
    res.render('login', {pageTitle: 'login page', path: '/login'});
});


// @desc    Registration Page
// @route   Get /users/register
router.get('/register', (req, res) => {
    res.render('register', {pageTitle: 'registeration page', path: '/register'});
});

module.exports = router;