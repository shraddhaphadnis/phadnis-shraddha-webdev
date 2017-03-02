module.exports = function (app) {
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/page/:pageId/widget", sortWidget);

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

    var widgets = [
        {
            "_id": "123",
            "widgetType": "heading",
            "pageId": "321",
            "size": 2,
            "text": "GIZMODO"
        },

        {
            "_id": "234",
            "widgetType": "heading",
            "pageId": "321",
            "size": 4,
            "text": "Lorem ipsum"
        },
        {
            "_id": "345",
            "widgetType": "image",
            "pageId": "321",
            "width": "100%",
            "url": "https://i.kinja-img.com/gawker-media/image/upload/s--UE7cu6DV--/c_scale,fl_progressive,q_80,w_800/xoo0evqxzxrrmrn4ayoq.jpg"
        },
        {
            "_id": "456",
            "widgetType": "html",
            "pageId": "321",
            "text": '<p>Anker’s kevlar-reinforced PowerLine cables are' +
            ' <a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" ' +
            'target="_blank" ' +
            'rel="noopener">far and away our readers’ top choice for charging their gadgets' +
            '</a>, ' +
            'and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection.' +
            ' I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.' +
            '<br>' +
            '</p>'
        },
        {
            "_id": "567",
            "widgetType": "heading",
            "pageId": "321",
            "size": 4,
            "text": "Lorem ipsum"
        },
        {
            "_id": "678",
            "widgetType": "youtube",
            "pageId": "321",
            "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E"
        },
        {
            "_id": "789",
            "widgetType": "html",
            "pageId": "321",
            "text": "<p>Lorem ipsum</p>"
        }
    ];

    function findAllWidgetsForPage(req, res) {
        var widget = [];
        var pageId = req.params['pageId'];
        for (var w in widgets) {
            if (widgets[w].pageId === pageId) {
                widget.push(widgets[w]);
            }
        }
        res.send(widget);
    }

    function createWidget(req, res) {
        var newWidget = req.body;
        newWidget.pageId = req.params['pageId'];
        widgets.push(newWidget);
        res.sendStatus(200);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params['widgetId'];
        var widget = widgets.find(function (w) {
            return w._id == widgetId;
        });
        res.send(widget);
    }

    function updateWidget(req, res) {
        var widgetId = req.params['widgetId'];
        var widget = req.body;
        for (var w in widgets) {
            var widget_var = widgets[w];
            if (widget_var._id === widgetId) {
                widgets[w].widgetType = widget.widgetType;
                widgets[w].size = widget.size;
                widgets[w].text = widget.text;
                res.send(widget_var);
                return;
            }
        }
    }

    function deleteWidget(req, res) {
        widgetId = req.params['widgetId'];
        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                widgets.splice(w, 1);
            }
        }
        res.send(widgets);
    }

    function uploadImage(req, res) {
        var pageId = null;
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var myFile = req.file;
        var destination = myFile.destination; // folder where file is saved to

        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets[i].width = width;
                widgets[i].url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;
                pageId = widgets[i].pageId;
            }
        }

        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
    }

    function sortWidget(req, res) {
        var pid = req.params['pageId'];
        var i1 = parseInt(req.query.initial);
        var i2 = parseInt(req.query.final);

        var widgetsForGivenPage = [];
        for (var index in widgets) {
            if (widgets[index].pageId == pid) {
                widgetsForGivenPage.push(index);
            }
        }
        for (var i = i1; i < i2; i++) {
            var temp = widgets[widgetsForGivenPage[i]];
            widgets[widgetsForGivenPage[i]] = widgets[widgetsForGivenPage[i+1]];
            widgets[widgetsForGivenPage[i+1]] = temp;
        }

        for (var i = i1; i > i2; i--) {
            var temp = widgets[widgetsForGivenPage[i]];
            widgets[widgetsForGivenPage[i]] = widgets[widgetsForGivenPage[i-1]];
            widgets[widgetsForGivenPage[i-1]] = temp;
        }
        res.sendStatus(200);
    }
};


