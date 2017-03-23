module.exports = function (app,userModel) {
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId",updateUser);
    app.post("/api/user/",createUser);
    app.delete("/api/user/:userId",deleteUser);

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(userId, newUser)
            .then(function (response) {
                if(response.nModified === 1){
                    // Update was successful
                    userModel
                        .findUserById(userId)
                        .then(function (response) {
                            res.json(response);
                        },function () {
                            res.sendStatus(404);
                        })
                }
                else{
                    res.sendStatus(404);
                }
            },function () {
                res.sendStatus(404);
            });
    }
    function updateUser(req,res) {
        var userId = req.params['userId'];
        var newUser = req.body;
        userModel
            .updateUser(userId, newUser)
            .then(function (user) {
                if (user.nModified === 1) {
                    userModel
                        .findUserById(userId)
                        .then(function (user) {
                            res.json(user);
                        }, function () {
                            res.sendStatus(404);
                        })
                }
                else {
                    res.sendStatus(404);
                }
            }, function () {
                res.sendStatus(404);
            });
    }

    function createUser(req, res) {
        var user = req.body;
        var newUser = {
            username: user.username,
            password: user.password,
            email: user.email,
            firstName: user.firstname,
            lastName: user.lastname
        };
        userModel
            .createUser(newUser)
            .then(function (newUser) {
                res.json(newUser);
            },function (err) {
                res.sendStatus(404).send(err);
            });
    }
    function findUserById(req,res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            },function (err) {
                res.sendStatus(404).send(err);
            });
    }

    function findUser(req,res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if (username && password) {
            findUserByCredentials(req,res);
        } else if (username) {
            findUserByUsername(req,res);
        }
    }

    function findUserByUsername(req,res) {
        var username = req.query['username'];
        userModel
            .findUserByUsername(username)
            .then(function (users) {
                if (users.length != 0) {
                    res.json(users[0]);
                }
                else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }

    function findUserByCredentials(req,res) {
        var username = req.query['username'];
        var password = req.query['password'];
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if (user.length != 0) {
                    res.json(user[0]);
                }
                else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }
};