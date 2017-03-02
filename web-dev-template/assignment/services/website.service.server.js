module.exports = function (app) {
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.post("/api/user/:userId/website",createWebsite);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId",updateWebsite);
    app.delete("/api/website/:websiteId",deleteWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", created: new Date() },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem", created: new Date() },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem", created: new Date() },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date() },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", created: new Date() },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem", created: new Date() }
    ];

    function deleteWebsite(req,res) {
        var websiteId = req.params['websiteId'];
        for (var w in websites) {
            if (websites[w]._id === websiteId) {
                websites.splice(w, 1);
                res.send(websites);
            }
        }
    }

    function updateWebsite(req,res) {

        var websiteId = req.params['websiteId'];
        var website = req.body;

        for(var w in websites) {
            var website_var = websites[w];
            if (website_var._id === websiteId) {
                websites[w].name = website.name;
                websites[w].description = website.description;
                res.send(websites[w]);
            }
        }
    }

    function findWebsiteById(req,res) {
        wid = req.params['websiteId'];
        for(var w in websites) {
            if(websites[w]._id === wid) {
                res.send(websites[w]);
            }
        }
    }

    function findAllWebsitesForUser(req,res) {
        var sites = [];
        var userId = req.params['userId'];
        for(var w in websites) {
            if(websites[w].developerId === userId) {
                sites.push(websites[w]);
            }
        }
        res.send(sites);
    }

    function createWebsite(req,res) {
        var newWebsite = req.body;
        newWebsite.developerId = req.params['userId'];
        newWebsite._id = (new Date()).getTime().toString();
        websites.push(newWebsite);
        res.send(websites);
    }
};
