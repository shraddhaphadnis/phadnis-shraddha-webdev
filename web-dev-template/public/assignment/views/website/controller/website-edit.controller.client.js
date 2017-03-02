(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            var promise = WebsiteService
                .findWebsiteById(vm.websiteId)
                .success(function (website) {
                    vm.website = website;
                });
            var promise1 = WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .success(function (website) {
                    vm.websites = website;
                });
        }
        init();

        function deleteWebsite () {
            var promise = WebsiteService
                .deleteWebsite(vm.websiteId)
                .success(function (website) {
                    $location.url("/user/"+vm.userId+"/website");
                });
        }
        function updateWebsite () {
            var promise = WebsiteService
                .updateWebsite(vm.websiteId,vm.website)
                .success(function (website) {
                    $location.url("/user/"+vm.userId+"/website");
                });
        }
    }
})();