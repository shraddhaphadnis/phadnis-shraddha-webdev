module.exports = function(app,model){
    var HotelModel = model.hotelModel;
    app.get('/api/city/:cityId/hotel',findHotelByCityId);
    app.get("/api/hotel/:hotelId",findHotelByHotelId);
    app.post("/api/hotel/:hotelId/hotelnew/", createHotel);
    app.get('/api/getAllHotels/', getAllHotels);
    app.get('/api/hotel/',findHotel);
    app.delete('/api/admin/hotel/:HotelId',deleteHotelAdmin);
    app.post("/api/project/admin/hotel",createHotelAdmin);
    app.put('/api/hotel/:hotelId', updateHotel);
    app.put('/api/business/user/:userId/hotel/:hotelId',updateBusiness);

    function findHotelByHotelId(req,res) {
        hotelId = req.params.hotelId;
        HotelModel
            .findHotelByHotelId(hotelId)
            .then(function (hotel) {
                res.send(hotel);
            },function (err) {
                res.sendStatus(400).send(err);
            });
    }
    function updateBusiness(req,res) {
        var hotelId = req.params.hotelId;
        var userId = req.params.userId;
        console.log("calling update business"+ hotelId + " " + userId);
        model.hotelModel
            .updateBusiness(hotelId,userId)
            .then(function (status) {
                res.send(200);
            },
            function (err) {
                res.sendStatus(400).send(error);
            });
        res.send('0');
    }

    function updateHotel(req, res){
        var hotel = req.body;
        var hid = req.params.hotelId;
        console.log("service server"+hid);

        model
            .hotelModel
            .updateHotel(hid, hotel)
            .then(function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                })
        res.send('0');
    }

    function createHotelAdmin(req, res) {
        var newUser = req.body;
        console.log(newUser);
        model.hotelModel
            .findHotelByIbiboHotelId(newUser.hotelId)
            .then(function (user) {
                    console.log("inside then"+ " " +user);
                    // if the user does not already exist
                    if (user == null) {
                        console.log("hotel is null");
                        // create a new user
                        return model.hotelModel.createHotel(newUser.hotelId,newUser)
                            .then(
                                function () {
                                    console.log("in side then findAllHotels");
                                    return model.hotelModel.findAllHotels();
                                },
                                function (err) {
                                    console.log("bugg");
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        console.log("findallhotels");
                        return model.hotelModel.findAllHotels();
                    }
                },
                function (err) {
                    console.log("error");
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function () {
                    res.status(400).send(err);
                }
            );
    }

    function deleteHotelAdmin(req, res) {
        console.log("delete admin called ^^^^");
        model.hotelModel
            .deleteHotel(req.params.HotelId)
            .then(
                function (hotel) {
                    console.log("RRRRRRR" + hotel);
                    return model.hotelModel.findAllHotels();
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (hotels) {
                    res.json(hotels);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

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
        //var hotelNew = {};
       // hotelNew["hotelId"] = req.params.hid;
        newhotel = req.body;
        console.log("create hotel req body" + newhotel);
        id = req.param['hotelId'];
        model.hotelModel.findHotelByIbiboHotelId(id)
            .then(function (hotel1) {
                if(!hotel1){
           //        console.log("hotel inside create hotel server" + hotel);
                    model.hotelModel.createHotel(id,newhotel)
                        .then(function (hotelObj) {
                            console.log("inside create hotel response" + hotelObj);
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