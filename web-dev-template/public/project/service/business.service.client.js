/**
 * Created by shrad on 4/10/2017.
 */
(function () {
    angular
        .module("MyHotelApp")
        .factory("BusinessService", BusinessService)
    function BusinessService($http) {
        //noinspection JSAnnotator
        var api = {

            findBusinessById: findBusinessById,
            findBusinessByHotelId: findBusinessByHotelId,
            createBusiness: createBusiness,
            updateBusiness: updateBusiness,
            deleteBusiness: deleteBusiness,
            getAllDiscounts: getAllDiscounts,
            findHotelInBusiness :findHotelInBusiness,
            findBusinessByUser : findBusinessByUser

        };
        return api;

        function findBusinessByUser(username) {
            console.log("client ####");
            var url = '/api/getbusinessbyuserId/'+username;
            return $http.get(url);
        }

        function findHotelInBusiness(hotelId) {
            var url = '/api/getbusiness/' + hotelId;
            return $http.get(url);
        }

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

       /* function createBusiness(userId, hotelBusiness) {
            var url = '/api/user/'+userId+'/business';
            console.log(hotelBusiness);
            return $http.post(url,hotelBusiness);
        }*/
        function createBusiness(userId, hotelId, hotelReview) {
            var url = '/api/user/'+userId+'/hotel/'+hotelId+'/business';
            console.log(hotelReview);
            return $http.post(url,hotelReview);
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