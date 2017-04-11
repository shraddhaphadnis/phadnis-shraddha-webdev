/**
 * Created by shrad on 4/10/2017.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var UserSchema = require("../user/user.schema.server")();
    var BusinessSchema = mongoose.Schema({
        _hotel:{type: mongoose.Schema.Types.ObjectId, ref:"HotelModel"},
        discount: String,
        username: String,
        hotelId: String,
        _user: {type : mongoose.Schema.Types.ObjectId, ref : 'UserModel'},
        dateCreated: {type: Date, default: Date.now}
    },{collection:"business"});
    return BusinessSchema;
};