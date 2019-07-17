const usersDao = require('../daos/users.dao');

class usersController {
    static fetchUser(req, res) {
        usersDao.fetchUser(req.body.user, req.body.password)
            .then(user => {
                if (user.length) {
                    res.statusMessage = "Ok";
                    res.status(200)
                    res.json(user)
                }
                else {
                    res.statusMessage = "Username/password doesn't exist";
                    res.status(400).end();
                }
            })
    }
}

module.exports = usersController