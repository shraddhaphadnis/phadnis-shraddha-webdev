(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        var api = {
            "findAllWebsitesForUser": findAllWebsitesForUser,
            "createWebsite": createWebsite,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };
        return api;

        function findAllWebsitesForUser(userId) {
            return $http.get("/api/user/" + userId + "/website");
        }

        function findWebsiteById(wid) {
            return $http.get("/api/website/" + wid);
        }

        function deleteWebsite(websiteId) {
            return $http.delete("/api/website/"+websiteId);
        }

        function createWebsite(userId, website) {
            return $http.post("/api/user/" + userId + "/website", website);
        }

        function updateWebsite(websiteId, website) {
            return $http.put("/api/website/" + websiteId,website);
        }
    }
})();