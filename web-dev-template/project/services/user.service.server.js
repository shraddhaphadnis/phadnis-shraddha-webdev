module.exports = function(app,model){

    var passport      = require('passport');
    var LocalStrategy      = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var bcrypt = require("bcrypt-nodejs");
    var cookieParser  = require('cookie-parser');
    var session       = require('express-session');

    app.use(session({
        secret: 'this is the secret',
        resave: true,
        saveUninitialized: true
    }));

    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/#/user',
            failureRedirect: '/project/#/login'
        }));

    var facebookConfig = {
        clientID    :   "302238760175775",
        clientSecret : "666d0c6ad902fc6d36c2c1cf2f882fbd",
        callbackURL  : "http://localhost:3000/auth/facebook/callback"
    }

    passport.use(new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    //console.log("Inside user service server js");
    app.post('/api/login',login);
    app.post('/api/checkLogin', checkLogin);
    app.post('/api/checkAdmin', checkAdmin);
    app.post('/api/logout', logout);
    app.get('/api/getAllUsers/', getAllRegUsers);
    app.get('/api/user', findUser);
    app.post ('/api/register', register);
    app.put("/api/user/:followerId/follows/:followeeId", FollowUser);
    //app.put("/api/project/user/:loggedInUserId/unfollows/:navigateUserId", unfollow);
    //app.get('/api/loggedin', loggedin);
    //app.get('/api/user?username=username&password=password',findUserByCredentials);
    app.get('/api/user/:userId',findUserById);
    app.post('/api/user',createUser);
    app.post("/api/project/admin/user",createUserAdmin);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId',deleteUser);
    app.delete('/api/admin/user/:userId',deleteUserAdmin);
    app.put("/api/user/:userId/city/:cityId/hotelDetails/:HotelId/like",likeHotel);
    app.put("/api/user/:userId/city/:cityId/hotelDetails/:HotelId/undolike",undoLikeHotel);
    app.get("/api/user/:userId/city/:cityId/hotelDetails/:HotelId/isHotelLiked",isHotelLiked);
    app.put("/api/user/:loggedInUserId/user2/:secondUserId",follow);
    app.put("/api/user/:loggedInUserId/user2/:secondUserId/unfollow",unfollow);

    function follow(req, res){
        var loggedInUserId = req.params.loggedInUserId;
        var secondUserId = req.params.secondUserId;

        model.userModel
            .addToFollowing(loggedInUserId, secondUserId)
            .then(
                function (response) {

                    return model.userModel.addToFollowers(secondUserId, loggedInUserId);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function unfollow(req,res) {
        var loggedInUserId = req.params.loggedInUserId;
        var secondUserId = req.params.secondUserId;
        console.log("im unfollowing");
        model.userModel
            .removeFromFollowing(loggedInUserId, secondUserId)
            .then(
                function (response) {
                    console.log("removed from following..");
                    return model.userModel.removeFromFollowers(secondUserId, loggedInUserId);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (response) {
                    res.json(response);

                },
                function (err) {
                    res.status(400).send(err);
                });
    }


    function likeHotel(req, res) {
        var HotelId = req.params.HotelId;
        var userId = req.params.userId;
        model.userModel.updatelikeStatus(userId,HotelId,true)
            .then(function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }
    function undoLikeHotel(req, res) {
        var HotelId = req.params.HotelId;
        console.log(HotelId);
        var userId = req.params.userId;
        model.userModel.updatelikeStatus(userId,HotelId,false)
            .then(function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                }

            );
    }

    function isHotelLiked(req, res) {
        console.log("server side liked hotel called");
        var HotelId = req.params.HotelId;
        console.log(HotelId);
        var UserId = req.params.userId;
        model.userModel
            .isHotelLiked(UserId, HotelId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function getAllRegUsers(req, res) {
        model.userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }

    function FollowUser(req, res) {
        var followerId = req.params.followerId;
        var followeeId = req.params.followeeId;
        model.userModel
            .following(followerId, followeeId)
            .then(
                function (response) {
                    return model.userModel.followers(followeeId, followerId);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }


    function register(req, res) {
        console.log("In project user service");
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        model.userModel
            .createUser(user)
            .then(
            function(user){
                console.log(user);
                if(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            }
        );
    }
    
    function logout(req, res) {
        req.logout();
        res.send(200);
    }


    function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user :  '0');
    }

    function checkAdmin(req, res) {
        console.log(req.user.role);
        var loggedIn = req.isAuthenticated();
        var isAdmin = req.user.role == 'ADMIN';

        if(loggedIn&& isAdmin)
            res.json(req.user);
        else
            res.send('0');
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        model.userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var newFacebookUser = {
                            username:  profile.displayName.replace(/\s+/g, ''),
                            firstName: profile.displayName.split(" ")[0],
                            lastName:  profile.displayName.split(" ")[1],
                            email:     "",
                            facebook: {
                                id:    profile.id,
                                email:     "",
                                token: token
                            }
                        };
                        return model.userModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function localStrategy(username, password, done) {
       // console.log(username);
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    //console.log(user);
                    if(user && bcrypt.compareSync(password, user.password)) {
                        //console.log("In if ")
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
        //res.send('0');
    }
    
    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model.userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    //  console.log(user);
                    done(null, user)
                    // if(user)
                    //     res.send(user);
                    // else
                    //     res.send('0');
                },
                function (error) {
                    done(error, null)
                    //res.sendStatus(400).send(error);
                });
    }
        function login(req, res) {
            console.log("Login");
            var user  = req.user;
            res.json(user);
        }
        function createUser(req, res) {
            var user = req.body;
            // user._id = (new Date().getTime()).toString();
            // user.push(user);
            //console.log(user);
            model.userModel.createUser(user)
                .then(
                    function (newuser) {
                        res.send(newuser);
                    },
                    function (error) {
                        res.sendStatus(400).send("Error");
                    }
                );
        }

    function createUserAdmin(req, res) {
        var newUser = req.body;
        console.log(newUser);
        model.userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    console.log("*********"+user);
                    // if the user does not already exist
                    if (user == null) {
                        // create a new user
                        return model.userModel.createUser(newUser)
                            .then(
                                function () {
                                    return model.userModel.findAllUsers();
                                },
                                function (err) {
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return model.userModel.findAllUsers();
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function () {
                    res.status(400).send(err);
                }
            );
    }
    function findUser(req,res) {
        var username = req.query['username'];
        var password = req.query['password'];
        console.log("find user called" + " " + username + " " + password);
        if (username && password) {
            findUserByCredentials(req,res);
        } else if (username) {
            findUserByUsername(req,res);
        }
    }


        function findUserByUsername(req,res) {

            var user,username;
            username = req.query.username;
            for( var u in users){
                if(users[u].username === username){
                    user = users[u];
                    res.send(user);
                    return;
                }
            }
            res.send('0');
        }
    function findUserByCredentials(req,res) {
        var username = req.query['username'];
        var password = req.query['password'];
        console.log("find credentials called" + " " + username + " " + password);
        model.userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if (user.length != 0) {
                    console.log("response = "+user);
                    res.json(user[0]);
                }
                else {
                    console.log("error");
                    res.sendStatus(404);
                }
            }, function (err) {
                console.log("error !!!");
                res.sendStatus(404).send(err);
            });
    }

    function findUserById(req,res) {
        //console.log("Inside ind user by id")
        var userId = req.params.userId;
        model.userModel
            .findUserById(userId)
            .then(
                function (user) {
                    console.log(user);
                    if(user)
                        res.send(user);
                    else
                        res.send('0');
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
        //res.send('0');
    }


    function loggedInAndSelf(req, res, next) {
        var loggedIn = req.isAuthenticated();
        var userId = req.params.userId;

        var self = userId == req.user._id;

        if(self && loggedIn){
            next();
        }else{
            res.send("You are not the same person.");
        }
    }

    function updateUser(req, res){
        var user = req.body;
        var uid = req.params.userId;
        console.log("service server"+uid);

        model
            .userModel
            .updateUser(uid, user)
            .then(function (status) {
                res.send(200);
            },
            function (error) {
                res.sendStatus(400).send(error);
            })
        res.send('0');
    }

    function deleteUser(req, res){
        var uid = req.params.userId;
        model.userModel
            .deleteUser(uid)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function deleteUserAdmin(req, res) {
            model.userModel
                .deleteUser(req.params.userId)
                .then(
                    function (user) {
                        return model.userModel.findAllUsers();
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                )
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
            }
}