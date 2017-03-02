var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public2'));
var courses = [
    {title: "java", seats:23, start: new Date()},
    {title: "C", seats:10, start: new Date(2015,9,4)},
    {title: "Nodejs", seats:40, start: new Date(2016,8,1)}
];

app.post("/rest/course",function(req,res)
{
    var course = req.body;
    courses.push(course);
    res.json(courses);
});
app.get("/rest/course/:id",function(req,res)
{
    var index = req.params["id"];
    res.json(courses[index]);
});

app.delete("/rest/course/:id",function(req,res)
{
    var index = req.params["id"];
    courses.splice(index,1);
    res.json(courses);
});


app.get('/rest/course',function (req,res) {

    res.json(courses);
});
app.listen(3000);