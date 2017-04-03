/**
 * Created by shrad on 3/31/2017.
 */
(function(){
    angular
        .module("MyHotelApp")
        .factory("SearchService",SearchService);

    function SearchService($http) {
        var api = {
            "searchRestuarants":searchRestuarants
        };
        return api;

        function searchRestuarants(searchTerm) {
            var key = "943295503c0911c7b508d458e9503987";
            var urlBase = "https://developers.zomato.com/api/v2.1/search?collection_id=1";
          //  var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.setRequestHeader("user-key",key).get(urlBase);
        }
    }
})();
