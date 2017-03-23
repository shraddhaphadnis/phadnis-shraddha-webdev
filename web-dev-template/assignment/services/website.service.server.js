module.exports = function (app,websiteModel) {
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.post("/api/user/:userId/website",createWebsite);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId",updateWebsite);
    app.delete("/api/website/:websiteId",deleteWebsite);

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .deleteWebsite(websiteId)
            .then(function (website) {
                res.json(website);
            }, function (error) {
                res.sendStatus(404).send(error);
            });
    }
    function updateWebsite(req,res) {
        var websiteId = req.params['websiteId'];
        var website = req.body;
        websiteModel
            .updateWebsite(websiteId, website)
            .then(function (response) {
                if (response.ok === 1 && response.n === 1) {
                    // Update was successful
                    res.sendStatus(200);
                }
                 else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function findWebsiteById(req,res) {
        wid = req.params['websiteId'];
        websiteModel
            .findWebsiteById(wid)
            .then(function (website) {
                res.json(website);
            },function (err) {
                res.sendStatus(404).send(err);
            });
    }

    function findAllWebsitesForUser(req, res){
        var userId = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (response) {
                res.json(response);
            },function (err) {
                res.sendStatus(404);
            });
    }
    function createWebsite(req, res) {
        var userId = req.params.userId;
        var website = req.body;
        var newWebsite = {
            name :website.name,
            description: website.description
        };
        websiteModel
            .createWebsiteForUser(userId,newWebsite)
            .then(function (newWebsite) {
                res.json(newWebsite);
            },function (err) {
                res.sendStatus(404).send(err);
            });
    }
}
