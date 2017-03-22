/**
 * Created by shrad on 3/11/2017.
 */
var WidgetModelReference;
module.exports = function () {
    var model = null;
    var mongoose = require("mongoose");
    var WidgetSchema;
    var WidgetModel ;

    var api = {
        "createWidget": createWidget,
        "findAllWidgetsForPage": findAllWidgetsForPage,
        "findWidgetById": findWidgetById,
        "updateWidget": updateWidget,
        "deleteWidget":deleteWidget,
        //"deleteBulkWidgets": deleteBulkWidgets,
        //"reorderWidget": reorderWidget,
        "setModel": setModel,
        "getModel": getModel
    };
    return api;
    
    function createWidget(pageId,widget) {
        return WidgetModel
            .create(widget)
            .then(function (widget) {
                return model.pageModel
                    .findPageById(pageId)
                    .then(function (page) {
                        widget._page = page._id;
                        page.widgets.push(widget);
                        widget.save();
                        page.save();
                        return widget;
                    }, function (err) {
                        return err;
                    });
            },function (err) {
                return err;
            });
    }
    
    function findAllWidgetsForPage(pageId) {
        return WidgetModel.find({_page:pageId});
    }

    function findWidgetById(widgetId) {
        return WidgetModel.findById({_id:widgetId});
    }
    function updateWidget(widgetId,widget) {
        console.log("update widget called");
        return WidgetModel.update(
            {_id:widgetId},
            {$set:widget})
    }

    function setModel(_model) {
        model = _model;
        WidgetSchema = require('./widget.schema.server')(_model);
        WidgetModel = mongoose.model("WidgetModel", WidgetSchema);
    }

    function getModel() {
        return WidgetModel;
    }

    function deleteBulkWidgets(arrWidgetId){
        return WidgetModel.remove({'_id':{'$in':arrWidgetId}});
    }

    function deleteWidget(widgetId) {
        console.log("deletewidget called");
        return WidgetModel.findByIdAndRemove(widgetId, function (err,widget) {
            if (widget!=null) {
                widget.remove();
            }
        });
    }

}