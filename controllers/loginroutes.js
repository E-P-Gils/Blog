const { User } = require('../models');
const router = require('express').Router();
const bcrypt = require('bcrypt');

//changed casing for push 

router.get('/', async (req, res) => {
  res.render('login');
})

//post name/email/password data to the database when the user creates an account
router.post('/create', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({
      username,
      email,
      password
    });

    req.session.save(() => {
      req.session.logged_in = true; //registers them as logged in after creating an account
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


//post request route to log someone in when they log in
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

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