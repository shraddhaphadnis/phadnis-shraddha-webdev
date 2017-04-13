/**
 * Created by shrad on 4/10/2017.
 */
(function() {
    var app = angular
        .module("MyHotelApp")
        .controller("EditBusinessController", EditBusinessController)
        .controller("NewBusinessController", NewBusinessController);


    /*function NewBusinessController($routeParams, $location, BusinessService, HotelService) {
        var vm = this;
        vm.hotelId = $routeParams.hid;
        vm.userId = $routeParams.uid;
        vm.cityId = $routeParams.cid;

        console.log(vm.userId);
        vm.addBusiness = addBusiness;

        function addBusiness(userId, hotelId, hotelBusiness) {
            console.log(hotelBusiness);
            hotelBusiness._hotel = hotelId;
            vm.hotelId = $routeParams.hid;
            vm.userId = $routeParams.uid;
            vm.cityId = $routeParams.cid;

            newhotel = {};
            newhotel.hotelId = hotelId;
            newhotel.hotelName = vm.hotelName;
            newhotel.hotelCity = vm.hotelCity;

            HotelService
                .findHotelByCityId(vm.cityId)
                .then(function (hotel) {
                        BusinessService
                            .createBusiness(userId,hotelBusiness)
                            .then(function (data) {
                                var URL = "/user/" + vm.userId + "/city/" + vm.cityId + "/hotelDetails/" + vm.hotelId;
                                console.log("Discount add success");
                                $location.url(URL);
                            })
                    },function () {
                    HotelService
                        .createHotel(vm.hotelId,newhotel)
                        .then(function (hotel) {
                            HotelService.createBusiness(userId,hotelBusiness)
                                .then(function (data) {
                                    var URL = "/user/" + vm.userId + "/city/" + vm.cityId + "/hotelDetails/" + vm.hotelId;
                                    console.log("Discount add success");
                                    $location.url(URL);
                                })
                        },function (err) {
                            console.log("could not create the hotel");
                        })
                });
        }
    }*/

    function NewBusinessController($routeParams, $location, BusinessService, HotelService) {
        var vm = this;
        vm.hotelId = $routeParams.hid;
        vm.userId = $routeParams.uid;
        vm.cityId = $routeParams.cid;

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
            vm.hotelId = $routeParams.hid;
            vm.userId = $routeParams.uid;
            vm.cityId = $routeParams.cid;
            hotelReview.hotelName = vm.hotelName;
            console.log("(((((((((("+hotelReview.hotelName);
            hotelReview.hotelCity = vm.hotelCity;


            console.log(hotelReview);


            var promise = BusinessService.createBusiness(vm.userId, vm.hotelId, hotelReview);
            promise
                .success(function (data) {
                    var URL = "/user/" + vm.userId + "/city/" + vm.cityId + "/hotelDetails/" + vm.hotelId;
                    console.log("business add success");
                    $location.url(URL);
                })
                .error(function () {
                });

        }
    }

    function EditBusinessController($routeParams, $location, ReviewService, HotelService,BusinessService) {
        //console.log("Hello in hotel list controller");
        var vm = this;
        vm.hotelId = $routeParams.hid;
        vm.userId = $routeParams.uid;
        vm.businessId = $routeParams.bid;
        vm.cityId = $routeParams.cid;

        vm.updateBusiness = updateBusiness;
        vm.deleteBusiness = deleteBusiness;

        function updateBusiness(newBusiness) {
            vm.hotelId = $routeParams.hid;
            vm.userId = $routeParams.uid;
            vm.businessId = $routeParams.bid;
            vm.cityId = $routeParams.cid;
            var promise = BusinessService.updateBusiness(vm.businessId, newBusiness);
            promise.success(function (data) {
                //console.log(data);
                $location.url("/user/" + vm.userId + "/city/" + vm.cityId + "/hotelDetails/" + vm.hotelId);

            })
        }

        function deleteBusiness(businessId) {
            vm.hotelId = $routeParams.hid;
            vm.userId = $routeParams.uid;
            vm.businessId = $routeParams.bid;
            vm.cityId = $routeParams.cid;
            var promise = BusinessService.deleteBusiness(businessId);
            promise.success(function (data) {
                $location.url("/user/" + vm.userId + "/city/" + vm.cityId + "/hotelDetails/" + vm.hotelId);

            })
        }

        function init() {
            //console.log("Hi");
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
