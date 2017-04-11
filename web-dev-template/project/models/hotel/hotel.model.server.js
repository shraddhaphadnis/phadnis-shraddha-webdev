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
        updateHotel : updateHotel,
        updateBusiness: updateBusiness

    };
    return api;

    function updateBusiness(hotelId,userId) {
            console.log(">>>>>" + hotelId);
        return model.userModel
            .findUserById(userId)
            .then(function(userObject) {
                    console.log("inside userobject" + userObject);
                    return HotelModel
                        .find({ hotelId : hotelId})
                        .then(function (hotelObj) {
                            console.log("after hotel id" + hotelObj);
                            console.log("after update####" + userObject);
                            userObject.Business_owned.push(hotelObj);
                            userObject.save();
                            return HotelModel.update({hotelId: hotelId}, {$addToSet: {business_owner: userObject}});
                            console.log("*******************" +  userId);
                            userId = userId.toString();
                        }, function(error){
                                    console.log("in hotel object save error");
                                    console.log(error);
                                });
                    },
                    function(error){
                        console.log("in model restaurant error");
                        console.log(error);
                    });
        }

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