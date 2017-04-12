(function () {
    angular
        .module("MyHotelApp")
        .factory("ReviewService", ReviewService)
    function ReviewService($http) {
        var api = {

            findReviewById: findReviewById,
            findReviewByHotelId: findReviewByHotelId,
            createReview: createReview,
            updateReview: updateReview,
            deleteReview: deleteReview,
            getAllReviews: getAllReviews,
            deleteCommentAdmin : deleteCommentAdmin,
            createAdminReview :createAdminReview

        };
        return api;

        function createAdminReview(review) {
            return $http.post('/api/project/admin/review', review);
        }

        function deleteCommentAdmin(reviewId) {
            console.log("delete user admin client");
            return $http.delete('/api/admin/review/' + reviewId);
        }

        function getAllReviews() {
            console.log("getAll reviews client side");
            var url = '/api/getAllReviews/';
            return $http.get(url);
        }

        function findReviewById(reviewId) {
            var url = '/api/review/' +  reviewId;
            return $http.get(url);
        }

        function findReviewByHotelId(hotelId) {
            var url = '/api/hotel/review/' +  hotelId;
            return $http.get(url);
        }

        function createReview(userId, hotelId, hotelReview) {
            var url = '/api/user/'+userId+'/hotel/'+hotelId+'/review';
            console.log(hotelReview);
            return $http.post(url,hotelReview);
        }

        function updateReview(reviewId, reviewUpdated) {
            var url = '/api/editReview/'+reviewId;
            console.log(url);
            return $http.put(url,reviewUpdated);
        }
        function deleteReview(reviewId) {
            var url = '/api/delReview/'+reviewId;
            console.log(url);
            return $http.delete(url);
        }

    }
})();