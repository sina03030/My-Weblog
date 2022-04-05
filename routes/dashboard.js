const {Router} = require('express');

const router = new Router();

// @desc    Dashboard
// @route   /dashboard
router.get('/', (req, res)=> {
    res.render('dashboard', {pageTitle: 'Dashboard', path: '/dashboard', layout: './layouts/dashLayout.ejs'});
});

// @desc    Login Page
// @route   Get /dashboard/login
router.get('/login', (req, res) => {
    res.render('login', {pageTitle: 'login page', path: '/login'});
});

module.exports = router;