var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(__dirname + '/public'));

var assignment = require("./assignment/app.js");
var project = require("./project/client/js/app");
require("./assignment/model/user/user.model.server.js");
require("./assignment/model/website/website.model.server.js");
require("./assignment/model/page/page.model.server.js");
require("./assignment/model/widget/widget.model.server.js");
require("../project/models/user/user.model.server");
require("../project/models/hotel/hotel.model.server");
require("../project/models/review/review.model.server");
require("../project/models/city/city.model.server");
assignment(app);
project(app);

var port      = process.env.PORT || 3000;

app.listen(port);