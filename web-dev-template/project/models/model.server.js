module.exports = function () {
    var mongoose = require("mongoose");
    var userModel = require("./user/user.model.server")();
    var reviewModel = require("./review/review.model.server")();
    var hotelModel = require("./hotel/hotel.model.server.js")();
    var cityModel = require("./city/city.model.server")();
    var model = {
        userModel:userModel,
        reviewModel:reviewModel,
        hotelModel:hotelModel,
        cityModel:cityModel
    };
    hotelModel.setModel(model);
    reviewModel.setModel(model);
    userModel.setModel(model);
    cityModel.setModel(model);
    return model;

};