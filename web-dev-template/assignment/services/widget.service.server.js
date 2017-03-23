module.exports = function (app,widgetModel) {
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/page/:pageId/widget", updateWidgetOrder);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    var multer = require('multer');

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + "/../../public/uploads")
        },
        filename: function (req, file, cb) {
            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];
            cb(null, 'widget_image_' + Date.now() + '.' + extension)
        }
    });

    var upload = multer({storage: storage});
    app.post("/api/upload", upload.single('myFile'), uploadImage);


    function findAllWidgetsForPage(req, res) {
        var widget = [];
        var pageId = req.params['pageId'];
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (response) {
                res.json(response);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }

    function updateWidget(req,res) {
        var widgetId = req.params.widgetId;
        var updatedWidget = req.body;

        widgetModel
            .updateWidget(widgetId,updatedWidget)
            .then(function (response) {
                if (response.ok === 1 && response.n === 1) {
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(404);
                }
            }, function (err) {
                    res.sendStatus(404).send(err);
                });
    }

    function createWidget(req, res) {
        var newWidget = req.body;
        var pageId = req.params['pageId'];
                widgetModel
                    .createWidget(pageId,newWidget)
                    .then(function (response) {
                        res.json(response);
                    },function (err) {
                        res.sendStatus(404).send(err);
                    });
        }

    function findWidgetById(req, res) {
        var widgetId = req.params['widgetId'];
        widgetModel
            .findWidgetById(widgetId)
            .then(function (response) {
                res.send(response);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }

    function deleteWidget(req, res) {

        var widgetId = req.params.widgetId;

        widgetModel
            .deleteWidget(widgetId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function uploadImage(req, res) {
        var pageId = null;
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var imagewidget = {
            width: width,
            _id:widgetId
        };
        if (req.file != null) {
            var myFile = req.file;
            var destination = myFile.destination; // folder where file is saved to
            imagewidget.url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;
            widgetModel
                .updateWidget(widgetId,imagewidget)
                .then(function (response) {
                    if (response.ok === 1 && response.n === 1) {
                        widgetModel
                            .findWidgetById(widgetId)
                            .then(function (newresponse) {
                                pageId = newresponse._page;
                                res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
                            })
                        }
                    else {
                        res.sendStatus(404);
                    }
                }, function (err) {
                    res.sendStatus(404).send(err);
                });
        }
            else{
                pageId = req.body.pageId;
                res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/"+widgetId);
            }
    }

    function updateWidgetOrder(req, res) {
        var pageId = req.params.pageId;
        var start = parseInt(req.query.initial);
        var end = parseInt(req.query.final);

        widgetModel
            .resortWidget(pageId, start, end)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400);
                });
    }
};


