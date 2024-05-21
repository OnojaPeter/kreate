// middlewares/attachUser.js
module.exports = (req, res, next) => {
    // console.log('req.user:', req.user);
    res.locals.user = req.user;
    next();
};
  