/**
 * Created by shrad on 4/10/2017.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var UserSchema = require("../user/user.schema.server")();
    var BusinessSchema = mongoose.Schema({
        _hotel:String,
        discount: String,
        username: String,
        hotelId: String,
        hotelName: String,
        hotelCity: String,
        _user: {type : mongoose.Schema.Types.ObjectId, ref : 'UserModel'},
        dateCreated: {type: Date, default: Date.now}
    },{collection:"business"});
    return BusinessSchema;
};