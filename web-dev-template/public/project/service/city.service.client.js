
(function () {
    angular
        .module("MyHotelApp")
        .factory("CityService", CityService)
    function CityService($http) {
        var api = {

            findCityByName: findCityByName,
            findCityIdByCityName: findCityIdByCityName

        };
        return api;


        function findCityByName(city) {
            var url = "/api/getCityId/" + city;
            console.log(city);
            console.log("inside city client", +url);
            return $http.get(url);
        }

        function findCityIdByCityName(city) {
            return $http.get("/api/"+city);
        }
    }
})();