module.exports = function () {
    var mongoose = require("mongoose");
    var HotelSchema = require("./hotel.schema.server.js")();
    var HotelModel = mongoose.model("HotelModel", HotelSchema);

    var api = {
        createHotel:createHotel,
        findHotelById: findHotelById,
        findHotelByIbiboHotelId : findHotelByIbiboHotelId,
        //deleteUserReview : deleteUserReview,
        setModel: setModel //,
        //findWebsitesForUser: findWebsitesForUser
    };
    return api;


    function setModel(_model) {
        model = _model;
    }


    function findHotelById(hotelId) {

        return HotelModel.findById(hotelId)
            .then(function (hotel) {
                return hotel;
            })
    }

    function createHotel(hotel) {
        //console.log("In project");
        return HotelModel.create(hotel);
    }

    function findHotelByIbiboHotelId(ibiboHotelId) {
        console.log("In hotel find");
        return HotelModel.findOne({
            hotelId:ibiboHotelId
        });
    }



    // function deleteUserReview(reviewId) {
    //
    //     return HotelModel.remove({
    //         _id: userId
    //     })
    //
    // }

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