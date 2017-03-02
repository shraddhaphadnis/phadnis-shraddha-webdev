(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams._id;
        vm.createPage = createPage;

        function init() {
            var promise = PageService
                .findAllPagesForWebsite(vm.websiteId)
                .success(function (page) {
                    vm.pages = page;
                });
        }

        init();

        function createPage(page) {
            PageService.createPage(vm.websiteId, page)
                .success(function (website) {
                    $location.url("/user/" + vm.userId + "/website/"+vm.websiteId+"/page");
                })
                .error(function () {
                    vm.error="Sorry could not create page";
                })
        }
    }
})();
