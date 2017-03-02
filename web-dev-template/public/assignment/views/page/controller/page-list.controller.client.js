(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.websiteId = $routeParams.wid;
        vm.userId = $routeParams.uid;

        function init() {
            var promise =  PageService
                .findAllPagesForWebsite(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                });
        }
        init();
    }
})();