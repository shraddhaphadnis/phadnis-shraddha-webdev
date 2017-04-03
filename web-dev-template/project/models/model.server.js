
module.exports = function () {
    var mongoose = require("mongoose");
    // mongoose.connect("mongodb://localhost/makeYouTour"); ///check
    //mongoose.connect("mongodb://rajiv:rajiv@ec2-35-167-239-223.us-west-2.compute.amazonaws.com:27017/dummyDB");
    // mongoose.connect("mongodb://mongo:mongo@ec2-35-165-64-189.us-west-2.compute.amazonaws.com:27017/dummyDB");
    //console.log("Inside model server js");
    var userModel = require("./user/user.model.server")();
    var reviewModel = require("./review/review.model.server")();
    var hotelModel = require("./hotel/hotel.model.server.js")();
    var cityModel = require("./city/city.model.server")();
    var model = {
        userModel:userModel,
        reviewModel:reviewModel,
        hotelModel:hotelModel,
        cityModel:cityModel
        // widgetModel:widgetModel
    };
    hotelModel.setModel(model);
   reviewModel.setModel(model);
    userModel.setModel(model);
   cityModel.setModel(model);
    return model;

};