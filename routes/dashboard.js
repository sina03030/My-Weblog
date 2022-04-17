const { Router } = require('express');
const { authenticated } = require('../middlewares/auth');

const router = new Router();

// @desc    Dashboard
// @route   /dashboard
router.get('/', authenticated, (req, res) => {
    res.render('dashboard', { pageTitle: 'Dashboard', path: '/dashboard', layout: './layouts/dashLayout.ejs', fullname: req.user.fullname });
});



module.exports = router;