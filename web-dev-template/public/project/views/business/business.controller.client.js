/**
 * Created by shrad on 4/10/2017.
 */
(function() {
    var app = angular
        .module("MyHotelApp")
        .controller("EditBusinessController", EditBusinessController)
        .controller("NewBusinessController", NewBusinessController);


    function NewBusinessController($routeParams, $location, BusinessService, HotelService) {
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
