const { User } = require('../models');
const router = require('express').Router();
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
  res.render('login');
})

router.post('/create', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({
      username,
      email,
      password
    });

    req.session.save(() => {
      req.session.logged_in = true; 
      req.session.user_id = user.id;
      res.json({ user: user, message: 'Account created!' });
    });

  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      res.status(400).json({message: "Must enter a valid email and password of 8 or more characters"});
    } else {
      console.error(err);
      res.status(500);
    }
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    } 

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;

      res.json({ user: user, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.error(err);
  }
});


module.exports = router;