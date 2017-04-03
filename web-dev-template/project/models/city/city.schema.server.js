module.exports = function () {
    var mongoose = require("mongoose");
    //var CityListSchema = require("../review/review.schema.server")();
    var CityListSchema = mongoose.Schema({
        "City Name": String,
        "City ID": String,
        "Domestic Flag": Number
    },{collection:"citydb"});
    return CityListSchema;
}