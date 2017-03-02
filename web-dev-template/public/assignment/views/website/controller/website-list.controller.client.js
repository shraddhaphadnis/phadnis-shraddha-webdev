(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.userId = userId;

        function init() {
            var promise =  WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                });
        }
        init();
    }
})();