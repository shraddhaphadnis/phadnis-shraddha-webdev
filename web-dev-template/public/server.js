var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(__dirname + '/public'));

var assignment = require("./assignment/app.js");
require("./assignment/model/user/user.model.server.js");
require("./assignment/model/website/website.model.server.js");
require("./assignment/model/page/page.model.server.js");
require("./assignment/model/widget/widget.model.server.js");
assignment(app);

var port      = process.env.PORT || 3000;

app.listen(port);