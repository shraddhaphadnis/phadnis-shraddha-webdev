/**
 * Created by shrad on 4/10/2017.
 */
(function () {
    angular
        .module("MyHotelApp")
        .factory("BusinessService", BusinessService)
    function BusinessService($http) {
        var api = {

            findBusinessById: findBusinessById,
            findBusinessByHotelId: findBusinessByHotelId,
            createBusiness: createBusiness,
            updateBusiness: updateBusiness,
            deleteBusiness: deleteBusiness,
            getAllDiscounts: getAllDiscounts

        };
        return api;


        function getAllDiscounts() {
            console.log("getAll discounts client side");
            var url = '/api/getAllDiscounts/';
            return $http.get(url);
        }

        function findBusinessById(businessId) {
            var url = '/api/business/' +  businessId;
            return $http.get(url);
        }

        function findBusinessByHotelId(hotelId) {
            var url = '/api/hotel/business/' +  hotelId;
            return $http.get(url);
        }

        function createBusiness(userId, hotelBusiness) {
            var url = '/api/user/'+userId+'/business';
            console.log(hotelBusiness);
            return $http.post(url,hotelBusiness);
        }

        function updateBusiness(businessId, businessUpdated) {
            var url = '/api/editBusiness/'+businessId;
            console.log(url);
            return $http.put(url,businessUpdated);
        }
        function deleteBusiness(businessId) {
            var url = '/api/delBusiness/'+businessId;
            console.log(url);
            return $http.delete(url);
        }

    }
})();