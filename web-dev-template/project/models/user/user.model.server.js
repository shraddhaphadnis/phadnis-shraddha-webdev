module.exports = function () {
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser:createUser,
        findUserById:findUserById,
        findUserByUsername : findUserByUsername,
        findUserByCredentials:findUserByCredentials,
        updateUser : updateUser,
        findAllUsers:findAllUsers,
        deleteUser : deleteUser,
        findUserByFacebookId: findUserByFacebookId,
        //FollowUser: FollowUser,
        setModel: setModel,
        following: following,
        followers: followers,
        updatelikeStatus: updatelikeStatus,
        isHotelLiked: isHotelLiked
    };
    return api;

    function updatelikeStatus(userId,HotelId,status) {
        console.log("inside update status");
        console.log(status);
        if(status == true) {
            console.log("status is true");
            return UserModel.update({_id: userId}, {$addToSet: {likes: HotelId}});
        }
        else if(status == false) {
            console.log("status is false");
            return UserModel.update({_id: userId}, {$pullAll: {likes: [HotelId]}});
        }
    }

    function isHotelLiked(userId, HotelId) {
        console.log(userId + " " + HotelId);
        return UserModel.findOne({_id: userId, likes: {$in: [HotelId]}});
    }

    function findAllUsers() {
        return UserModel.find();
    }

    function following(loggedInUserId, navigateUserId) {
        return UserModel.update({_id: loggedInUserId},
            {$addToSet: {following: navigateUserId}});
    }

    function followers(navigateUserId, loggedInUserId) {
        return UserModel.update({_id: navigateUserId},
            {$addToSet:
            {followers: loggedInUserId}
            });
    }


    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    function setModel(_model) {
        model = _model;
    }


    function findUserById(userId) {
        return UserModel.findById(userId)
            .then(function (user) {
                return user;
            })
    }

    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserByCredentials(username, password) {
        console.log("Login");
        return UserModel.findOne({
            username:username,
            password:password
        });
    }

    function findUserByUsername(username) {

        return UserModel.findOne({
            username:username
        });
    }

    function updateUser(userId, user) {

        return UserModel.update(
            {
                _id: userId
            },
            {
                $set:user
            }
        );
    }

    function deleteUser(userId) {

        return UserModel.remove({
            _id: userId
        })

    }

};