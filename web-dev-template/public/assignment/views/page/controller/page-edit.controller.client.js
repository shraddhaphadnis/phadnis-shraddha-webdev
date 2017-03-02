(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        function init() {
            var promise = PageService
                .findPageById(vm.pageId)
                .success(function (page) {
                    vm.page = page;
                });
            var promise1 = PageService
                .findAllPagesForWebsite(vm.websiteId)
                .success(function (page) {
                    vm.pages = page;
                });
        }
        init();

        function deletePage () {
            var promise = PageService
                .deletePage(vm.pageId)
                .success(function (page) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                });
        }
        function updatePage () {
            var promise = PageService
                .updatePage(vm.pageId,vm.page)
                .success(function (page) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                });
        }
    }
})();