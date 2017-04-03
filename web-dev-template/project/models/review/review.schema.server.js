module.exports = function () {
    var mongoose = require("mongoose");
    var UserSchema = require("../user/user.schema.server")();
    var ReviewSchema = mongoose.Schema({
        _hotel:{type: mongoose.Schema.Types.ObjectId, ref:"HotelModel"},
        comment: String,
        username: String,
        hotelId: String,
        rating: String,
        _user: {type : mongoose.Schema.Types.ObjectId, ref : 'UserModel'},
        dateCreated: {type: Date, default: Date.now}
    },{collection:"review"});
    return ReviewSchema;
};