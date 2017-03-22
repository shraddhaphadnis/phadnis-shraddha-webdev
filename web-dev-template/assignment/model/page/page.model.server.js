/**
 * Created by shrad on 3/11/2017.
 */
module.exports = function () {
    var model = null;
    var mongoose = require("mongoose");
    var PageSchema;
    var PageModel;

    var api = {
        "createPage": createPage,
        "findAllPagesForWebsite": findAllPagesForWebsite,
        "findPageById":findPageById,
        "updatePage":updatePage,
        "deletePage":deletePage,
        "setModel": setModel,
        "getModel": getModel
    };
    return api;

    function createPage(websiteId, page) {
        console.log(page);
        return PageModel
            .create({name:page.name,description:page.description,_website: websiteId})
            .then(function (pageObj) {
                console.log(websiteId);
                model.websiteModel
                    .findWebsiteById(websiteId)
                    .then(function (websiteObj) {
                        console.log(pageObj);
                        websiteObj.pages.push(pageObj);
                        websiteObj.save();

                        return pageObj;
                    })
            });
    }

    function findAllPagesForWebsite(websiteId) {
        return PageModel.find({_website:websiteId});
    }
    function findPageById(pageId) {
        return PageModel.findOne({_id : pageId});
    }
    function updatePage(pageId,page) {
        return PageModel.update(
            {_id:pageId},
            {$set:page}
        );
    }
    function deletePage(pageId) {
        return PageModel.findByIdAndRemove(pageId, function (err,page) {
            if (page!=null) {
                page.remove();
            }
        });

    }
    function setModel(_model) {
        model = _model;
        PageSchema = require("./page.schema.server")(_model);
        PageModel = mongoose.model("PageModel", PageSchema);
    }
    function getModel() {
       return PageModel;
    }
};