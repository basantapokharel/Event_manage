module.exports = {
    isAuthenticated: (req, res, next) => {
        if (req.session && req.session.userId) {
            // User is signed in, proceed to the next middleware or route handler
            return next();
        } else {
            // User is not signed in, redirect to the login page
            return res.redirect("/");
        }
    }
};