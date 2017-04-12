module.exports = function () {
    var mongoose = require("mongoose");
    var ReviewSchema = require("./review.schema.server")();
    var ReviewModel = mongoose.model("ReviewModel", ReviewSchema);

    var api = {
        createReview:createReview,
        findReviewById:findReviewById,
        findAllReviews: findAllReviews,
        updateReview : updateReview,
        deleteReview : deleteReview,
        setModel: setModel,
        findReviews: findReviews
    };
    return api;

    function findReviews() {
        return ReviewModel.find();
    }

    function setModel(_model) {
        model = _model;
    }


    function findAllReviews(hotelId) {
        return ReviewModel.find({
            'hotelId' : hotelId
        });
    }
    function findReviewById(reviewId) {
        return ReviewModel.findById(reviewId)
            .then(function (review) {
                return review;
            })
    }

  /*  function createReview(userId,hotelId,reviewNew) {
        console.log(reviewNew);
        return ReviewModel.create(reviewNew)
            .then(function(reviewObject){
                console.log("review object" + reviewObject);
                return model.userModel
                    .findUserById(userId)
                    .then(function(userObject) {
                        console.log("inside create review"+userObject);
                                userObject.reviews.push(reviewObject);
                                userObject.save();
                                reviewObject._user = userObject._id;
                                reviewObject.username = userObject.username;
                                reviewObject.save();
                                return reviewObject.save();
                            },
                                function(error){
                                    console.log("in model restaurant error");
                                    console.log(error);
                                });
                    },
                        function(error){
                            console.log("in model restaurant error");
                            console.log(error);
                        });
    }*/

    function createReview(userId,hotelId,reviewNew) {
        console.log(">>>>>" + hotelId);

        return ReviewModel.create(reviewNew)
            .then(function(reviewObject){
                    return model.userModel
                        .findUserById(userId)
                        .then(function(userObject) {
                            return model.hotelModel
                                .findHotelByHotelId(hotelId)
                                .then(function (hotel) {
                                    console.log("inside userobject" + hotel);
                                    reviewObject._user = userObject._id;
                                    reviewObject.username = userObject.username;
                                    reviewObject._hotel = hotelId;
                                  //  reviewObject.hotelName = hotel.hotelName;
                                  //  reviewObject.hotelCity = hotel.hotelCity;
                                    return reviewObject.save();
                                })

                            },
                            function(error){
                                console.log("in model restaurant error");
                                console.log(error);
                            });
                },
                function(error){
                    console.log("in model restaurant error");
                    console.log(error);
                });
    }

    function updateReview(reviewId, review) {

        return ReviewModel.update(
            {
                _id: reviewId
            },
            {
                $set: review
            }
        );
    }

    function deleteReview(reviewId) {

        return ReviewModel.remove({
            _id: reviewId
        })

    }
    
    // function findWebsitesForUser(userId) {
    //     return UserModel.findById(userId)
    //         .then(function(user){
    //             return user.websites;
    //         });
    //         // .then(function(user){
    //         //     return user.websites;
    //         //});
    // }

};