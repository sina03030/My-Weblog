const { Router } = require('express');
const Validator = require('fastest-validator');

const router = new Router();
const v = new Validator();

// @desc    Login Page
// @route   Get /users/login
router.get('/login', (req, res) => {
    res.render('login', { pageTitle: 'login page', path: '/login' });
});


// @desc    Registration Page
// @route   Get /users/register
router.get('/register', (req, res) => {
    res.render('register', { pageTitle: 'registeration page', path: '/register' });
});

// @desc    Registration Route
// @route   POST /users/register
router.post('/register', (req, res) => {
        const validate = v.validate(req.body, schema);
        const errorArr = [];
        console.log(validate);
        if (validate === true) {
            const { password, confirmPassword } = req.body;
            if (password !== confirmPassword) {
                errorArr.push({ message: 'password and repeatation is not the same' });
                return res.render('register', {
                    pageTitle: 'registeration page',
                    path: '/register',
                    errors: errorArr
                });
            } else {
                return res.render('register', {
                    pageTitle: 'registeration page',
                    path: '/register',
                });
            }
        }

        return res.render('register', {
            pageTitle: 'registeration page',
            path: '/register',
            errors: validate
        });
    

    // registerSchema.validate(req.body).then(res => {
    //     res.redirect('/users/login');
    // }).catch(err => {
    //     console.log(err);
    //     res.render('register', {
    //         pageTitle: 'registeration page',
    //         path: '/register',
    //         errors: err.errors
    //     });
    // });
});

// @desc    Login Route
// @route   POST /users/login
router.post('/login', (req, res) => {
    console.log(req.params);
});


/// Validator
const schema = {
    fullname: {
        type: 'string',
        min: 3,
        trim: true,
        max: 255,
        messages: {
            required: 'fullname is required',
            stringMax: 'fullname must be less than 255 char',

        }
    },
    email: {
        type: 'email',
        normalize: true,
        messages: {
            required: 'email is requried',
            string: 'check email',
        }
    },
    password: {
        type: 'string',
        min: 4,
        max: 255,
        messages: {
            required: 'password is required'
        }
    },
    confirmPassword: {
        type: 'string',
        min: 4,
        max: 255,
        messages: {
            required: 'password is required'
        }
    }
};

module.exports = router;