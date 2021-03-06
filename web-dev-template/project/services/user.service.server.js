module.exports = function(app,model){

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require("bcrypt-nodejs");

    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    var auth = authorized;


    app.post('/api/login', passport.authenticate('local'),login);
    app.post('/api/checkLogin', checkLogin);
    app.post('/api/checkAdmin', checkAdmin);
    app.post('/api/logout', logout);
    app.get('/api/getAllUsers/', getAllRegUsers);
    app.get('/api/user', findUser);
    app.post ('/api/register', register);
    app.put("/api/user/:followerId/follows/:followeeId", FollowUser);
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
    app.get ('/api/loggedin', loggedin);
    app.get("/api/allUsers/:hotelId",findUsersWhoLikedHotel);
    app.get("/api/removeFollowers/:toBeRemovedId",findUsersToDeleteFromFollowers);
    app.get("/api/removeFollowing/:toBeRemovedId",findUsersToDeleteFromFollowing);

    app.delete("/api/removeFollower/currentUser/:currentUserId/deleteUser/:toBeRemovedId",removeFromFollowers);
    app.delete("/api/removeFollowing/currentUser/:currentUserId/deleteUser/:toBeRemovedId",removeFromFollowing);


    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/index.html#/user/',
            failureRedirect: '/project/index.html#/login'
        }));


    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/google/oauth/callback',
        passport.authenticate('google', {
            successRedirect: '/project/index.html#/user/',
            failureRedirect: '/project/index.html#/login'
        }));

    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };
    //console.log("Inside user service server js");

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    function facebookStrategy(token, refreshToken, profile, done) {
        console.log(profile.id);
        model.userModel
            .findUserByFacebookId(profile.id)
            .then(function (user) {
                console.log(user);
                if(user) {
                    console.log(111);
                    done(null, user);
                } else {
                    console.log(profile);
                    var displayname = profile.displayName;
                    var user = {

                        //username: profile.emails[0].value,
                        //photo: profile.photos[0].value,
                        firstName: displayname.split()[0],
                        lastName:  displayname.split()[0],
                        facebook: {
                            id:    profile.id
                        }
                    };
                    return model.userModel.createUser(user);
                }
            }, function (err) {
                console.log(err);
                done(err, null);
            })
            .then(function (user) {
                done(null, user);
            }, function (err) {
                console.log(err);
                done(err, null);
            });
    }


    function googleStrategy(token, refreshToken, profile, done) {
        console.log(profile.id);
        model.userModel
            .findUserByGoogleId(profile.id)
            .then(function (user) {
                console.log(user);
                if(user) {
                    console.log(111);
                    done(null, user);
                } else {
                    console.log(222);
                    var user = {
                        username: profile.emails[0].value,
                        //photo: profile.photos[0].value,
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     profile.emails[0].value,
                        google: {
                            id:    profile.id
                        }
                    };
                    console.log("google authentication" + user.username);
                    return model.userModel.createUser(user);
                }
            }, function (err) {
                console.log(err);
                done(err, null);
            })
            .then(function (user) {
                console.log("##########"+user);
                done(null, user);
            }, function (err) {
                console.log(err);
                done(err, null);
            });
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }
    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model.userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }


    function findUsersToDeleteFromFollowers(req,res) {
        var toBeRemovedId=req.params['toBeRemovedId'];

        model.userModel.findUsersToDeleteFromFollowers(toBeRemovedId)
            .then(function (response) {

                res.json(response);

            },function (err) {
                res.status(400).send(err);

            })

        //return $http.get("/api/removeFollowers/"+toBeRemovedId+"/currentUser/"+currentUserId);

    }
    function findUsersToDeleteFromFollowing(req,res) {
        var toBeRemovedId=req.params['toBeRemovedId'];

        model.userModel.findUsersToDeleteFromFollowing(toBeRemovedId)
            .then(function (response) {

                res.json(response);

            },function (err) {
                res.status(400).send(err);

            })

        //return $http.get("/api/removeFollowing/"+toBeRemovedId+"/currentUser/"+currentUserId);

    }
    function removeFromFollowers(req,res) {
        var currentUserId = req.params.currentUserId;
        var toBeRemovedId = req.params.toBeRemovedId;

        model.userModel.removeFromFollowers(currentUserId,toBeRemovedId)
            .then(function (response) {
                res.json(response);

            },function (err) {
                res.status(400).send(err);

            })




    }

    function removeFromFollowing(req,res) {
        var currentUserId = req.params.currentUserId;
        var toBeRemovedId = req.params.toBeRemovedId;
        model.userModel.removeFromFollowing(currentUserId,toBeRemovedId)
            .then(function (response) {
                res.json(response);

            },function (err) {
                res.status(400).send(err);

            })
    }


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
        console.log("local strategy" +username);
            model.userModel.findOneUserByUsername(username)
            .then(
                function (user) {
                    console.log(user.username);
                    console.log(password);
                    console.log(bcrypt.compareSync(password, user.password));
                    if(user != null && user.username == username && bcrypt.compareSync(password, user.password)) {
                        console.log("In if ")
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
                        console.log("cretate user %%%%" + newUser);
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


    function findUserByUsername(req, res) {
        var username = req.query.username;
        model.userModel
            .findOneUserByUsername(username)
            .then(function (user) {
                console.log("hi "+user);
                if (user) {

                    res.json(user[0]);
                }
                else {

                    console.log(username + '22');
                    res.sendStatus(404);
                }
            },function (err) {
                console.log("in find userbyusername");
                res.sendStatus(404);
            });

    }
    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        model.userModel
            .findUserByCredentials(username, password)
            .then(function (response) {
                if (response.length != 0) {
                    res.json(response[0])
                }
                else {
                    console.log("error in credentials");
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function findUserById(req,res) {
        //console.log("Inside ind user by id")
        var userId = req.params.userId;
        model.userModel
            .findUserById(userId)
            .then(
                function (user) {
                    console.log("&&&&&&&&& find user by id"+ user);
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
    function findUsersWhoLikedHotel(req,res) {

        var hotelId = req.params.hotelId;
        model.userModel.findUsersWhoLikedHotel(hotelId)
            .then(function (response) {

                res.json(response);

            },function (err) {
                res.status(400).send(err);

            })

    }


}