const router = require('express').Router();
const { Sequelize } = require('sequelize');
const { post, User } = require('../models');



router.get('/', async (req, res) => {
    try {
        const post = await post.findAll({
            include: [
                {
                  model: User,
                  as: 'user', 
                  attributes: ['email'] 
                }
              ]
            });
        const posts = post.map((project) => project.get({ plain: true }));
        const items = cpus.concat(posts);
        res.render('homepage', {
            items
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
});


