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
        findDiscounts: findDiscounts
    };
    return api;

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
        console.log(">>>>>" + hotelId);

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
                                            reviewObject._hotel = hotelObj._id;
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