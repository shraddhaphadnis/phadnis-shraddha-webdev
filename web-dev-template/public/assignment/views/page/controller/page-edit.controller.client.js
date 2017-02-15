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
            vm.page = PageService.findPageById(vm.pageId);
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();

        function deletePage () {
            PageService.deletePage(vm.pageId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }
        function updatePage () {
            PageService.updatePage(vm.pageId,vm.page);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }
    }
})();