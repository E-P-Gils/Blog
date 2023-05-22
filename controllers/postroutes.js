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
        console.log(user_id);
        const { title, description } = req.body;
        console.log("Hit 2")
        console.log(ourPrice);
        const user = await memory.create({
            title,
            description,
        })

        console.log(ourPrice);
        res.json({ user: user, email: user.email, message: 'Upload successful!' });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
});

module.exports = router;