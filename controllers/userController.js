const User = require('../models/users');
const Post = require('../models/posts');


exports.dashboard = async (req, res) => {
    if(req.isAuthenticated()) {
       const user = await User.findById(req.user.id);
       const posts = await Post.find().populate('user');
       console.log(user);


       res.render('dashboard', { user: user, posts: posts });
    } else {
        res.redirect('/login');
    }
}

exports.addpost = async (req, res) => {
    if(!req.isAuthenticated()) {
        return res.redirect('/login');
    }

    console.log(req.body);
    const user = await User.findById(req.user.id);
    const post = new Post({
        content: req.body.content,
        user: user._id,
        membershipLevel: user.membership,
    });
    await post.save();
    res.redirect('/dashboard');
}