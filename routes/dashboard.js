const { Router } = require('express');

const { authenticated } = require('../middlewares/auth');
const adminController = require('../controllers/adminController');

const router = new Router();

// @desc    Dashboard
// @route   GET /dashboard
router.get('/', authenticated, adminController.getDashboard);

// @desc    Add-post page
// @route   GET /dashboard/add-post
router.get('/add-post', authenticated, adminController.getAddPost);

// @desc    Create post
// @route   GET /dashboard/add-post
router.post('/add-post', authenticated, adminController.createPost);


module.exports = router;