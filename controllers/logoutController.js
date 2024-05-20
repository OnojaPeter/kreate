async function logout (req, res) {
    try {
        req.logout(err => {
            if (err) { return next(err); }
            res.redirect('/');
          });
    } catch (error) {
        console.error('error logging out:', error)
    }
}

module.exports = logout