module.exports = function () {
    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        likes:[String],
        likeStatus: String,
        followerNames: [String],
        followers: [String],
        followingNames: [String],
        following: [String],
        facebook: {
            id:    String,
            token: String,
            email: String
        },
        role: {type:String, default:"CUSTOMER", enum:['ADMIN', 'CUSTOMER', 'OWNER']},
        reviews : [{type : mongoose.Schema.Types.ObjectId, ref:'ReviewModel'}],
        business : [{type : mongoose.Schema.Types.ObjectId, ref:'BusinessModel'}],
        dateCreated: {type: Date, default: Date.now},
        Business_owned : [String]
    },{collection:"user"});
    return UserSchema;
}