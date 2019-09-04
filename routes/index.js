const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const Post = require('../models/Post');



//welcome
router.get('/', (req, res) => res.render('welcome'));




//create
router.post('/addpost', (req, res) => {
    var postData = new Post(req.body);
    postData.save().then( result => {
        res.redirect('/dashboard');
    }).catch(err => {
        res.status(400).send("Unable to save data");
    });
});

//getpost



router.get("/dashboard", ensureAuthenticated, (req, res) =>
{
    Post.find({}, (err, posts) => {
       res.render(
        'dashboard', 
       { posts: posts, user: req.user})
    });
 });


module.exports = router;