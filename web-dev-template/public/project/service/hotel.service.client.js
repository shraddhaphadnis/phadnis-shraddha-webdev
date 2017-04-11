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
            findCurrentHotel: findCurrentHotel,
            deleteHotelAdmin:deleteHotelAdmin,
            createHotelAdmin:createHotelAdmin,
            updateHotel : updateHotel,
            //updateBusiness: updateBusiness
        };
        return api;

        function updateBusiness(hotelId, userId) {
            var url = "/api/business/user/"+userId+"/hotel/" + hotelId;
            return $http.put(url);
        }

        function updateHotel(hotelId,hotel) {
            console.log("server client"+hotelId);
            var url = "/api/hotel/" + hotelId;
            return $http.put(url,hotel);
        }

        function createHotelAdmin(hotel) {
            return $http.post('/api/project/admin/hotel',hotel);
        }

        function deleteHotelAdmin(HotelId) {
            console.log("delete Hotel admin client");
            return $http.delete('/api/admin/hotel/' + HotelId);
        }

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
        function createHotel(hotelId,hotelnew) {
            console.log("create hotel client called");
            console.log(hotelnew);
            return $http.post("/api/hotel/"+hotelId+"/hotelnew",hotelnew);
        }
    }
})();