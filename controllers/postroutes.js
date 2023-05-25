const router = require('express').Router();
const { post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/post', async (req, res) => {
    try {

        res.render('post');

    } catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
});

router.post('/post', async (req, res) => {
    try {
        const user_id = req.session.user_id
        const { title, description } = req.body;
        const user = await post.create({
            title,
            description,
        })

        res.json({ user: user, email: user.email, message: 'Upload successful!' });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
});

module.exports = router;