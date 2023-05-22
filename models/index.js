
const post = require('./post');

const User = require('./user');

User.hasMany(post,{
    foreignKey: 'user_id'
});

post.belongsTo(User,{
    foreignKey: 'user_id',
    as: "user"
});

module.exports = { 
    post,
    User
};