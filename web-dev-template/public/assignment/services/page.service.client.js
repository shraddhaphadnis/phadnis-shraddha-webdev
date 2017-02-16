(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService);
    function PageService() {
        var pages=[
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];
        var api = {
            "createPage": createPage,
            "updatePage": updatePage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "deletePage":deletePage
        };
        return api;

        function createPage(websiteId,page) {
            page.websiteId = websiteId;
            page._id = (new Date()).getTime().toString();
            pages.push(page);
        }

        function deletePage(pageId) {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    pages.splice(p, 1);
                }
            }
        }

        function updatePage(pageId,page) {
            for(var p in pages){
                var page_var=pages[p];
                if(page_var._id === pageId){
                    pages[p].name = page.name;
                    pages[p].description = page.description;
                    return page_var;
                }
            }
            return null;
        }

        function findPageByWebsiteId(websiteId) {
            var pagelist=[]
            for(var p in pages) {
                if(pages[p].websiteId === websiteId) {
                    pagelist.push(pages[p])
                }
            }
            return pagelist;
        }

        function findPageById(pageId) {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }


    }
})();
