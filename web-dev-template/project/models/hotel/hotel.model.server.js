module.exports = function () {
    var mongoose = require("mongoose");
    var HotelSchema = require("./hotel.schema.server.js")();
    var HotelModel = mongoose.model("HotelModel", HotelSchema);

    var api = {
        createHotel:createHotel,
        findHotelById: findHotelById,
        findHotelByIbiboHotelId : findHotelByIbiboHotelId,
        setModel: setModel,
        findAllHotels:findAllHotels,
        deleteHotel : deleteHotel,
        updateHotel : updateHotel

    };
    return api;

    function updateHotel(hotelId, hotel) {

        return HotelModel.update(
            {
                _id: hotelId
            },
            {
                $set:hotel
            }
        );
    }

    function deleteHotel(HotelId) {
        return HotelModel.remove({
            _id: HotelId
        })

    }
    function findAllHotels() {
        return HotelModel.find();
    }

    function setModel(_model) {
        model = _model;
    }


    function findHotelById(hotelId) {
        console.log("hotel by id called" + hotelId);
        return HotelModel.findById(hotelId);
    }

    function createHotel(hotelId,newhotel) {
        console.log("In project" + newhotel);
        return HotelModel.create(newhotel);
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