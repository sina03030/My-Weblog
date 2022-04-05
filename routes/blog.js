const { Router } = require('express');

const router = new Router();
// @desc Weblog landing page
router.get('/', (req, res) => {
    res.render('index', { pageTitle: 'Weblog', layout: './layouts/mainLayout.ejs', path: '/'});
});

module.exports = router;