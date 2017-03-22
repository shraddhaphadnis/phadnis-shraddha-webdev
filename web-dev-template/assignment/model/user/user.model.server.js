/**
 * Created by shrad on 3/11/2017.
 */
module.exports = function () {
    var model = null;
    var mongoose = require("mongoose");
    var UserSchema;
    var UserModel;

    var api = {
        "createUser": createUser,
        "findUserById": findUserById,
        "findUserByUsername":findUserByUsername,
        "findUserByCredentials":findUserByCredentials,
        "updateUser":updateUser,
        "deleteUser":deleteUser,
        "setModel":setModel,
        "getModel":getModel
    };

    return api;

    function createUser(user){
        console.log("createuser->model.server");
        console.log(user);
        return UserModel.create(user);
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findUserByUsername(username) {
        return UserModel
            .find({username: username});
    }
    
    function findUserByCredentials(username,password) {
        return UserModel
            .find(
                {
                    username : username,
                    password : password
                }
            );
    }

    function updateUser(userId,user) {
        return UserModel
            .update(
                {
                    _id: userId
                },
                {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone
                }
            );
    }

    function deleteUser(userId) {
        return userModel.findByIdAndRemove(userId, function (err, user) {
           if (user != null)
           {
               user.remove();
           }
        });

    }
    function setModel(_model) {
        model = _model;
        UserSchema = require('./user.schema.server')(_model);
        UserModel = mongoose.model('UserModel', UserSchema);
    }

    function getModel() {
        return UserModel;
    }
};