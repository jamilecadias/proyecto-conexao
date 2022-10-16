function adminMiddleware (req, res, next) {
    if ( !req.session.userLogged) res.redirect('/login');
    else if (req.session.userLogged.role === 'admin')  next();
    else res.redirect('/profile')
}

module.exports = adminMiddleware;

