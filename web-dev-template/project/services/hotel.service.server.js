module.exports = function(app,model){
    var HotelModel = model.hotelModel;
    app.get('/api/city/:cityId/hotel',findHotelByCityId);
    app.post('/api/hotelNew/:hid',createHotel);

    function createHotel(req, res) {
        //console.log(req.params.hid);
        var hotelNew = {};
        hotelNew["hotelId"] = req.params.hid;
        model.hotelModel.findHotelByIbiboHotelId(req.params.hid)
            .then(function (hotel) {
                console.log(hotel);
                if(!hotel){
                    model.hotelModel.createHotel(hotelNew)
                        .then(function (hotelObj) {
                            console.log(hotelObj);
                                res.send(hotelObj);
                            },
                            function (err) {
                                res.sendStatus(400);
                            });
                }
            })

    }

    function findHotelByCityId(req,res) {
        //console.log("Inside ind user by id")
        var cityId = req.params.cityId;
        model.hotelModel
            .findHotelByCityId(cityId)
            .then(
                function (user) {
                    console.log(user);
                    if(user)
                        res.send(user);
                    else
                        res.send('0');
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
        //res.send('0');
    }

}