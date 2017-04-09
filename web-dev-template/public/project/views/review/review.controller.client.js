(function() {
    var app = angular
        .module("MyHotelApp")
        .controller("EditReviewController", EditReviewController)
        .controller("NewReviewController", NewReviewController);


    function NewReviewController($routeParams, $location, ReviewService, HotelService) {
        var vm = this;
        vm.hotelId = $routeParams.hid;
        vm.userId = $routeParams.uid;
        vm.cityId = $routeParams.cid;
       /* HotelService
            .findHotelById(vm.hotelId)
            .success(function (hotel) {
                vm.hotelName = hotel.hotelName;
                vm.hotelCity = hotel.hotelCity;
            });*/

        console.log(vm.userId);
        vm.addReview = addReview;

        function addReview(userId, hotelId, hotelReview) {
            console.log(hotelReview);
            hotelReview._hotel = hotelId;
            vm.hotelId = $routeParams.hid;
            vm.userId = $routeParams.uid;
            vm.cityId = $routeParams.cid;
            console.log(hotelReview);

            newhotel = {};
            newhotel.hotelId = hotelId;
            newhotel.hotelName = vm.hotelName;
            newhotel.hotelCity = vm.hotelCity;

            HotelService.createHotel(vm.hotelId,newhotel);
            var promise = ReviewService.createReview(userId, hotelReview);
            promise
                .success(function (data) {
                    var URL = "/user/" + vm.userId + "/city/" + vm.cityId + "/hotelDetails/" + vm.hotelId;
                    console.log("review add success");
                    $location.url(URL);
                })
                .error(function () {

                });

        }
    }

    function EditReviewController($routeParams, $location, ReviewService, HotelService) {
        //console.log("Hello in hotel list controller");
        var vm = this;
        vm.hotelId = $routeParams.hid;
        vm.userId = $routeParams.uid;
        vm.reviewId = $routeParams.rid;
        vm.cityId = $routeParams.cid;

        vm.updateReview = updateReview;
        vm.deleteReview = deleteReview;

        function updateReview(newReview) {
            vm.hotelId = $routeParams.hid;
            vm.userId = $routeParams.uid;
            vm.reviewId = $routeParams.rid;
            vm.cityId = $routeParams.cid;
            var promise = ReviewService.updateReview(vm.reviewId, newReview);
            promise.success(function (data) {
                //console.log(data);
                $location.url("/user/" + vm.userId + "/city/" + vm.cityId + "/hotelDetails/" + vm.hotelId);

            })
        }

        function deleteReview(reviewId) {
            vm.hotelId = $routeParams.hid;
            vm.userId = $routeParams.uid;
            vm.reviewId = $routeParams.rid;
            vm.cityId = $routeParams.cid;
            var promise = ReviewService.deleteReview(reviewId);
            promise.success(function (data) {
                $location.url("/user/" + vm.userId + "/city/" + vm.cityId + "/hotelDetails/" + vm.hotelId);

            })
        }

        function init() {
            //console.log("Hi");
            var promise = ReviewService.findReviewById(vm.reviewId);
            promise
                .success(function (review) {

                    vm.review = review;
                    //console.log("vm.review" + vm.review);

                })
                .error(function () {

                });
            // vm.hotels_list = hotel_list;
            // console.log(vm.hotels_list);
        }

        init();
    }
})();
