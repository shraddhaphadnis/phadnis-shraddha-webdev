/**
 * Created by shrad on 4/10/2017.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var BusinessSchema = require("./business.schema.server")();
    var BusinessModel = mongoose.model("BusinessModel", BusinessSchema);

    var api = {
        createBusiness:createBusiness,
        findBusinessById:findBusinessById,
        findAllDiscounts: findAllDiscounts,
        updateBusiness : updateBusiness,
        deleteBusiness : deleteBusiness,
        setModel: setModel,
        findDiscounts: findDiscounts,
        findhotelInBusiness: findhotelInBusiness
    };
    return api;

    function findhotelInBusiness(hotelId) {
        return BusinessModel.findOne({
            'hotelId' : hotelId
        });
    }
    function findDiscounts() {
        return BusinessModel.find();
    }

    function setModel(_model) {
        model = _model;
    }

    function findAllDiscounts(hotelId) {
        return BusinessModel.find({
            'hotelId' : hotelId
        });
    }
    function findBusinessById(businessId) {
        return BusinessModel.findById(businessId)
            .then(function (business) {
                return business;
            })
    }


    function createBusiness(userId,hotelId,BusinessNew) {
        console.log(">>>>>" + BusinessNew.hotelName);

        return BusinessModel.create(BusinessNew)
            .then(function(reviewObject){
                    return model.userModel
                        .findUserById(userId)
                        .then(function(userObject) {
                                console.log("inside userobject");
                                return model.hotelModel
                                    .findHotelByIbiboHotelId(hotelId)
                                    .then(function (hotelObj) {
                                            console.log("after hotel id" + hotelObj);
                                            userObject.business.push(reviewObject);
                                            userObject.save();
                                            //hotelObj.business.push(reviewObject);
                                            //hotelObj.owned = true;
                                            //console.log(hotelObj);
                                            //hotelObj.save();
                                            reviewObject._user = userObject._id;
                                            reviewObject.username = userObject.username;
                                            reviewObject._hotel = hotelId;
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
                },
                function(error){
                    console.log("in model restaurant error");
                    console.log(error);
                });
    }
   /* function createBusiness(userId,hotelId,reviewNew) {
        console.log(">>>>>" + hotelId);

        return BusinessModel.create(reviewNew)
            .then(function(reviewObject){
                    return model.userModel
                        .findUserById(userId)
                        .then(function(userObject) {
                                return model.hotelModel
                                    .findHotelByHotelId(hotelId)
                                    .then(function (hotel) {
                                        console.log("inside userobject" + hotel);
                                        userObject.business.push(reviewObject);
                                        userObject.save();
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
    }*/


    function updateBusiness(businessId, business) {

        return BusinessModel.update(
            {
                _id: businessId
            },
            {
                $set: business
            }
        );
    }

    function deleteBusiness(businessId) {

        return BusinessModel.remove({
            _id: businessId
        })

    }
};