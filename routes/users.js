const { Router } = require('express');

const User = require('../models/User');
const userController = require('../controllers/userController');
const router = new Router();


//  @desc    Login Page
//  @route   Get /users/login
router.get('/login', userController.login);

//  @desc    Registration Page
//  @route   Get /users/register
router.get('/register', userController.register);

//  @desc    Logout Handle
//  @route   GET /users/logout
router.get('/logout', userController.logout);

//  @desc    Registration Route
//  @route   POST /users/register
router.post('/register', userController.createUser);

//  @desc    Login Handle
//  @route   POST /users/login
router.post('/login', userController.handleLogin);

module.exports = router;