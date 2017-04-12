module.exports = function(app,model){
    //var HotelModel = model.hotelModel;
    app.get('/api/getCityId/:name',findCityByName);
    app.get('/api/:name',findCityIdByCityName);

    function findCityByName(req,res) {
        console.log("Inside city by id");
        var city = req.params.name;
        console.log(city);
        model.cityModel
            .findCityByName(city)
            .then(
                function (user) {
                    console.log(user[0]["City ID"]);
                    if(user)
                        res.send(user[0]);
                    else
                        res.send('0');
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
        //res.send('0');
    }
    function findCityIdByCityName(req,res) {
        var city1 = req.params.name;
        console.log("^^^^^^^^" + city1);
        model.cityModel
            .findCityByName(city1)
            .then(
                function (city) {
                    console.log("######"+city[0]);
                    if (city)
                        res.send(city[0]);
                    else
                        res.send('0');
                },function (error) {
                    console.log("error in find cityby name");
                    res.sendStatus(400).send(error);
                });
    }
}