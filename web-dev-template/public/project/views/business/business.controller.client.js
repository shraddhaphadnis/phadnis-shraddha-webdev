/**
 * Created by shrad on 4/10/2017.
 */
(function() {
    var app = angular
        .module("MyHotelApp")
        .controller("EditBusinessController", EditBusinessController)
        .controller("NewBusinessController", NewBusinessController);

    function NewBusinessController($routeParams, $location, BusinessService, HotelService,$rootScope,loggedin) {
        var vm = this;
        vm.hotelId = $rootScope.hotelId;
        vm.userId = loggedin.data._id;
        vm.cityId = $rootScope.cityId;

        var promise1 = HotelService.findHotelById(vm.hotelId);
        promise1
            .success(function (hotelDetails) {
                console.log("hotel details in success!!!!" + hotelDetails.data[vm.hotelId]);
                vm.hotelDetails = hotelDetails.data[vm.hotelId].hotel_data_node;
                vm.hotelName = vm.hotelDetails.name;
                vm.hotelCity = vm.hotelDetails.loc.city;
                console.log("hotel city" + vm.hotelCity);
                console.log("hotel Name" + vm.hotelName);
            });

        /* HotelService
         .findHotelById(vm.hotelId)
         .success(function (hotel) {
         vm.hotelName = hotel.hotelName;
         vm.hotelCity = hotel.hotelCity;
         });*/

        console.log(vm.userId);
        vm.addBusiness = addBusiness;

        function addBusiness(userId, hotelId, hotelReview) {
            console.log(hotelReview);
            hotelReview._hotel = hotelId;
            vm.hotelId = $rootScope.hotelId;
            vm.userId = loggedin.data._id;
            vm.cityId = $rootScope.cityId;
            hotelReview.hotelName = vm.hotelName;
            console.log("(((((((((("+hotelReview.hotelName);
            hotelReview.hotelCity = vm.hotelCity;


            console.log(hotelReview);


            var promise = BusinessService.createBusiness(vm.userId, vm.hotelId, hotelReview);
            promise
                .success(function (data) {
                    var URL = "/user/city/hotelDetails";
                    console.log("business add success");
                    $location.url(URL);
                })
                .error(function () {
                });

        }
    }

    function EditBusinessController($routeParams, $location, ReviewService, HotelService,BusinessService,loggedin,$rootScope) {
        //console.log("Hello in hotel list controller");
        var vm = this;

        vm.updateBusiness = updateBusiness;
        vm.deleteBusiness = deleteBusiness;

        function updateBusiness(newBusiness) {
          //  vm.hotelId = $routeParams.hid;
          //  vm.userId = $routeParams.uid;
          //  vm.businessId = $routeParams.bid;
          //  vm.cityId = $routeParams.cid;
            var promise = BusinessService.updateBusiness(vm.businessId, newBusiness);
            promise.success(function (data) {
                console.log("business add success");
                //console.log(data);
                $location.url("/user/city/hotelDetails/");

            })
        }

        function deleteBusiness(businessId) {
            //vm.hotelId = $routeParams.hid;
            //vm.userId = $routeParams.uid;
            //vm.businessId = $routeParams.bid;
            //vm.cityId = $routeParams.cid;
            var promise = BusinessService.deleteBusiness(businessId);
            promise.success(function (data) {
                $location.url("/user/city/hotelDetails/");

            })
        }

        function init() {
            //console.log("Hi");
            vm.hotelId = $rootScope.hotelId;
            vm.userId = loggedin.data._id;
            vm.businessId = $rootScope.businessId;
            vm.cityId = $rootScope.cityId;

            var promise = BusinessService.findBusinessById(vm.businessId);
            promise
                .success(function (business) {

                    vm.business = business;
                    console.log("vm.business" + vm.business);

                })
                .error(function () {

                });
        }
        init();
    }
})();
