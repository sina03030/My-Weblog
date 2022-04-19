exports.get404 = (req, res)=> {
    res.render('errors/404', { pageTitle: 'page not found', path: '/404' });
}

exports.get500 = (req, res)=> {
    res.render('errors/500', { pageTitle: 'Server Error | 500', path: '/404' });
}