const router = require('express').Router();

const homeRoutes = require('./homeroutes.js');
const postRoutes = require('./postroutes.js');
const loginRoutes = require('./loginroutes.js');


router.use('/', homeRoutes);
router.use('/post', postRoutes);
router.use('/login', loginRoutes);



module.exports = router;