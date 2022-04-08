const {Router} = require('express');

const router = new Router();

// @desc    Dashboard
// @route   /dashboard
router.get('/', (req, res)=> {
    res.render('dashboard', {pageTitle: 'Dashboard', path: '/dashboard', layout: './layouts/dashLayout.ejs'});
});



module.exports = router;