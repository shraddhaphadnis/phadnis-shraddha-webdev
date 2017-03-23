/**
 * Created by shrad on 3/11/2017.
 */
var WidgetModelReference;
module.exports = function () {
    var model = null;
    var mongoose = require("mongoose");
    var WidgetSchema;
    var WidgetModel;

    var pageModel = require("../page/page.model.server");

    var api = {
        "createWidget": createWidget,
        "findAllWidgetsForPage": findAllWidgetsForPage,
        "findWidgetById": findWidgetById,
        "updateWidget": updateWidget,
        "deleteWidget": deleteWidget,
        "setModel": setModel,
        "getModel": getModel,
        "resortWidget": resortWidget
    };
    return api;

    function createWidget(pageId,widget){
        widget._page = pageId;
        return WidgetModel
            .find({"_page": pageId})
            .then(function (widgets) {
                    widget.index = widgets.length;
                    return WidgetModel
                        .create(widget)
                        .then(function (newWidget) {
                            return model
                                .pageModel
                                .findPageById(pageId)
                                .then(function (page) {
                                    newWidget._page = page._id;
                                    page.widgets.push(newWidget._id);
                                    page.save();
                                    newWidget.save();
                                    return newWidget;
                                }, function (err) {
                                    res.sendStatus(404);
                                });
                        }, function (err) {
                            res.sendStatus(404);
                        });
                },
                function (err) {
                    res.sendStatus(404).send(err);
                });
    }


    function findAllWidgetsForPage(pageId) {
        return WidgetModel.find({"_page": pageId})
            .sort('index')
            .exec(function (err, widgets) {
                if (err) {
                    return err;
                } else {
                    return widgets;
                }
            });
    }

    function findWidgetById(widgetId) {
        return WidgetModel.findById({_id: widgetId});
    }

    function updateWidget(widgetId, widget) {
        return WidgetModel.update(
            {_id: widgetId},
            {$set: widget})
    }

    function setModel(_model) {
        model = _model;
        WidgetSchema = require('./widget.schema.server')(_model);
        WidgetModel = mongoose.model("WidgetModel", WidgetSchema);
    }

    function getModel() {
        return WidgetModel;
    }

    function deleteBulkWidgets(arrWidgetId) {
        return WidgetModel.remove({'_id': {'$in': arrWidgetId}});
    }

    function deleteWidget(widgetId) {
        return WidgetModel.findByIdAndRemove(widgetId, function (err,widget) {
            var pageId = widget._page;
            var index = widget.index;
            WidgetModel.find({_page: pageId}, function (err, widgets) {
                widgets.forEach(function (widget) {
                    if (widget.index > index) {
                        widget.index = widget.index - 1;
                        widget.save();
                    }
                });
            });
            widget.remove();
        });

    }


    function resortWidget(pageId, start, end) {
        return WidgetModel
            .find({ _page: pageId}, function (err, widgets) {
                widgets.forEach(function (widget) {
                    if (start < end) {
                        if (widget.index == start) {
                            widget.index = end;
                            widget.save();
                        }
                        else if (widget.index > start && widget.index <= end) {
                            widget.index = widget.index - 1;
                            widget.save();
                        }
                    } else {
                        if (widget.index == start) {
                            widget.index = end;
                            widget.save();
                        }

                        else if (widget.index < start && widget.index >= end) {
                            widget.index = widget.index + 1;
                            widget.save();
                        }
                    }
                });
            });
    }
};