/**
 * Created by shrad on 3/31/2017.
 */
(function() {
    var app = angular
        .module("MyHotelApp")
        .controller("SearchCityController", SearchCityController)

    function SearchCityController($routeParams, CityService) {
        var vm = this;
        vm.city = $routeParams.city;
        function init() {
            var promise = CityService.findCityIdByCityName(vm.city);
            promise
                .success(function (cid) {
                    vm.cid = cid;
                    console.log(vm.cid);
                })

        }

        init();
    }
})();