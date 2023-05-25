const router = require('express').Router();
const { Sequelize } = require('sequelize');
const { post, User } = require('../models');



router.get('/', async (req, res) => {
    try {
       const posts = await post.findAll({
            include: [
                {
                  model: User,
                  as: 'user', 
                  attributes: ['email'] 
                }
              ]
            });
        const items = posts.map((project) => project.get({ plain: true }));
        res.render('homepage', {
            items
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
});

router.get('/post', async (req, res) => {
    try {

        res.render('post');

    } catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
});


module.exports = router;