module.exports = function (app,pageModel) {
    app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
    app.get("/api/page/:pageId",findPageById);
    app.post("/api/website/:websiteId/page",createPage);
    app.put("/api/page/:pageId",updatePage);
    app.delete("/api/page/:pageId",deletePage);

    function createPage(req,res) {
        var page = req.body;
        websiteId = req.params['websiteId'];
        pageModel
            .createPage(websiteId, page)
            .then(function (page) {
                res.json(page)
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function findPageById(req,res) {
        var pageId = req.params['pageId'];
        pageModel
            .findPageById(pageId)
            .then(function (page) {
                res.json(page);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function findAllPagesForWebsite(req,res) {
        var websiteId = req.params['websiteId'];
        var pageList = [];
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (page) {
                res.json(page);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function updatePage(req,res) {
        var pageId = req.params['pageId'];
        var page = req.body;
        pageModel
            .updatePage(pageId, page)
            .then(function (response) {
                if (response.ok === 1 && response.n === 1) {
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .deletePage(pageId)
            .then(function (page) {
                res.json(page);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }
};



