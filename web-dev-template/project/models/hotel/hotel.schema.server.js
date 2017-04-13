module.exports = function () {
    var mongoose = require("mongoose");
    //var ReviewSchema = require("../review/review.schema.server")();
    var HotelSchema = mongoose.Schema({
        hotelId: String,
        hotelName: String,
        hotelCity: String,
        reviews:[{type : mongoose.Schema.Types.ObjectId, ref:'ReviewModel'}],
        business_owner : [{type : mongoose.Schema.Types.ObjectId, ref:'UserModel'}],
        business : [{type : mongoose.Schema.Types.ObjectId, ref:'BusinessModel'}],
        dateCreated: {type: Date, default: Date.now},
        owned : [{type: Boolean, default: false}]
    },{collection:"hotel"});
    return HotelSchema;
}