const User = require('../models/users');


exports.dashboard = async (req, res) => {
    if(req.isAuthenticated()) {
       const user = await User.findById(req.user.id);
       console.log(user);
       res.render('dashboard', { user: user });
    } else {
        res.redirect('/login');
    }
}