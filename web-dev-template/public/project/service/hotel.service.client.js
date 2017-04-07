(function () {
    angular
        .module("MyHotelApp")
        .factory("HotelService", HotelService)
    function HotelService($http) {
        var api = {

            findHotelByCityId: findHotelByCityId,
            findHotelById: findHotelById,
            createHotel: createHotel,
            getAllHotels: getAllHotels,
            findCurrentHotel: findCurrentHotel

        };
        return api;


        function findCurrentHotel() {
            var url = '/api/hotel/';
            $http.get(url);
        }
        function getAllHotels() {
            var url = '/api/getAllHotels/';
            return $http.get(url);
        }

        function findHotelByCityId(cityId) {
            var url = "http://developer.goibibo.com/api/voyager/get_hotels_by_cityid/?app_id=14654cdf&app_key=1e64496250cc0415a50feda5b07a1c45&city_id="+cityId.toString();
            //console.log(url);
            return $http.get(url);
        }

        function findHotelById(hotelId) {
            var url = "http://developer.goibibo.com/api/voyager/?app_id=14654cdf&app_key=1e64496250cc0415a50feda5b07a1c45&method=hotels.get_hotels_data&id_list=%5B"+hotelId+"%5D&id_type=_id";
            console.log("inside hotelbyid client"+url);
            return $http.get(url);
        }
        function createHotel(hotel) {
            console.log("create hotel client called");
            var url = "/api/hotelNew/"+hotel;
            console.log(hotel);
            return $http.post(url);
        }
    }
})();