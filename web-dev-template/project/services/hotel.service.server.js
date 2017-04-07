module.exports = function(app,model){
    var HotelModel = model.hotelModel;
    app.get('/api/city/:cityId/hotel',findHotelByCityId);
    app.post('/api/hotelNew/:hid',createHotel);
    app.get('/api/getAllHotels/', getAllHotels);
    app.get('/api/hotel/',findHotel);

    function findHotel() {
            //console.log("Inside find user")
            var params = req.params;
            var query = req.query;
            //console.log(query);
            if(query.hotelId){
                //console.log("In if of creds");
                findHotelByCityId(req, res);
            } else{
                res.json(req.user);
            }
            // console.log(params);
            // console.log(query);
            //res.send(user);
    }
    function getAllHotels(req, res) {
        model.hotelModel.findAllHotels()
            .then(function (hotels) {
                res.send(hotels);
            })
    }

    function createHotel(req, res) {
        //console.log(req.params.hid);
        var hotelNew = {};
        hotelNew["hotelId"] = req.params.hid;
        model.hotelModel.findHotelByIbiboHotelId(req.params.hid)
            .then(function (hotel) {
                console.log("create hotel of server"+hotel);
                if(!hotel){
                    console.log("inside if");
                    model.hotelModel.createHotel(hotelNew)
                        .then(function (hotelObj) {
                            console.log("inside create hotel response");
                                console.log(hotelObj);
                                res.send(hotelObj);
                            },
                            function (err) {
                                console.log("bugg");
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