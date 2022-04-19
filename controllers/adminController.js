const Blog = require('../models/Blog');
const dateFormat = require('../utils/date_format');
const {get500} = require('../controllers/errorController');

exports.getDashboard = async (req, res) => {
    const blogs = await Blog.find({user: req.user.id});
    try {
        res.render('private/blogs', {
            pageTitle: 'Dashboard',
            path: '/dashboard',
            layout: './layouts/dashLayout.ejs',
            fullname: req.user.fullname,
            blogs,
            formatDate : dateFormat.toEnUS,
        });
    } catch (err) {
        console.log(err);
        get500(req, res);
    }
}

exports.getAddPost = (req, res) => {
    res.render('private/addPost', {
        pageTitle: 'New Post',
        path: '/dashboard/add-post',
        layout: './layouts/dashLayout',
        fullname: req.user.fullname,
    });
}

exports.createPost = async (req, res) => {
    try {
        console.log(req.body);
        await Blog.create({
            ...req.body,
            user: req.user.id,
        });
        res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        get500();
    }
}