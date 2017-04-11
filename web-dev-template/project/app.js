module.exports = function(app) {
    var model = require("./models/model.server")();

    require('./services/user.service.server.js')(app,model);
    require("./services/hotel.service.server")(app,model);
    require("./services/review.service.server")(app,model);
    require("./services/city.service.server")(app,model);
    require("./services/business.service.server")(app,model);
};
