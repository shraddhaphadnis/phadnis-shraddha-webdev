/**
 * Created by shrad on 3/11/2017.
 */
module.exports = function () {
    var model = null;
    var mongoose = require("mongoose");
    var WebsiteSchema;
    var WebsiteModel;

    var api = {
        "createWebsiteForUser": createWebsiteForUser,
        "findAllWebsitesForUser": findAllWebsitesForUser,
        "findWebsiteById":findWebsiteById,
        "updateWebsite":updateWebsite,
        "deleteWebsite":deleteWebsite,
        "setModel": setModel,
        "getModel": getModel
       // "removeallwidgets": removeallwidgets
    };
    return api;


    function setModel(_model) {
        model = _model;
        WebsiteSchema = require('./website.schema.server')(_model);
        WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);
    }

    function getModel() {
        return WebsiteModel;
    }


    function createWebsiteForUser(userId, website) {
        return WebsiteModel
            .create(website)
            .then(
                function(website){
                    return model.userModel
                        .findUserById(userId)
                        .then(function (user) {
                            website._user = user._id;
                            user.websites.push(website._id);
                            website.save();
                            user.save();
                            return website;
                        },function (err) {
                            return err;
                        })
                },
                function(err){
                    return err;
                });
    }

    function findAllWebsitesForUser(userId) {
        return WebsiteModel.find({_user:userId});
    }
    function findWebsiteById(websiteId) {
        return WebsiteModel.findById({_id: websiteId});
    }
    function updateWebsite(websiteId,website) {
        return WebsiteModel.update(
            {_id:websiteId},
            {$set:website}
        );
    }
    function deleteWebsite(websiteId) {
        return WebsiteModel.findByIdAndRemove(websiteId, function (err, website) {
            if(website != null) {
                website.remove();
            }
        });
    }
};