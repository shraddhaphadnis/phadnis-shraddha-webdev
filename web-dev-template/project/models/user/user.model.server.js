module.exports = function () {
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser:createUser,
        findUserById:findUserById,
        findOneUserByUsername : findOneUserByUsername,
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
        isHotelLiked: isHotelLiked,
        addToFollowing:addToFollowing,
        addToFollowers:addToFollowers,
        removeFromFollowing:removeFromFollowing,
        removeFromFollowers:removeFromFollowers,
        findUserByGoogleId : findUserByGoogleId,
        findUserByFacebookId :findUserByFacebookId,
        findUsersWhoLikedHotel:findUsersWhoLikedHotel,
        findUsersToDeleteFromFollowers:findUsersToDeleteFromFollowers,
        findUsersToDeleteFromFollowing:findUsersToDeleteFromFollowing
    };
    return api;

    function findUsersToDeleteFromFollowers(toBeRemovedId) {
        return UserModel.find({followers: {$in: [toBeRemovedId]}});

    }
    function findUsersToDeleteFromFollowing(toBeRemovedId) {
        return UserModel.find({following: {$in: [toBeRemovedId]}});

    }

    function findUsersWhoLikedHotel(hotelId) {
        //console.log("I have come here");
        return UserModel.find({likes: {$in: [hotelId]}});
        /*for(var i in likedUsers){
         console.log(likedUsers[i]);
         updatelikeStatus(likedUsers[i]._id,seriesId,"unlike");
         }
         return;*/

    }
    function findUserByGoogleId(googleId) {
        return UserModel
            .findOne({'google.id': googleId});
    }

    function findUserByFacebookId(facebookId) {
        return UserModel
            .findOne({'facebook.id': facebookId});
    }



    function addToFollowing(loggedInUserId,secondUserId) {

        return UserModel.update({_id: loggedInUserId}, {$addToSet: {following: secondUserId}});


    }

    function addToFollowers(secondUserId,loggedInUserId) {


        return UserModel.update({_id: secondUserId}, {$addToSet: {followers: loggedInUserId}});

    }

    function removeFromFollowing(loggedInUserId,secondUserId) {
        console.log("user1:"+loggedInUserId+" user2: "+secondUserId);
        return UserModel.update({_id: loggedInUserId}, {$pullAll: {following: [secondUserId]}});


    }

    function removeFromFollowers(secondUserId,loggedInUserId) {
        console.log("user1:"+loggedInUserId+" user2: "+secondUserId);

        return UserModel.update({_id: secondUserId}, {$pullAll: {followers: [loggedInUserId]}});

    }

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

    function findUserByCredentials(_username,_password){
        return UserModel.find({username:_username,password:_password});
    }
    function findOneUserByUsername(username) {
        console.log("findOneUserByUsername called");
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