/**
 * Created by shrad on 4/10/2017.
 */
module.exports = function(app, model){

    var BusinessModel = model.businessModel;
    app.get("/api/hotel/business/:hid", findBusinessByHotelId);
    app.get("/api/business/:bid", findBusinessById);
    app.post("/api/user/:uid/hotel/:hotelId/business", createBusiness);
    app.put("/api/editBusiness/:bid", updateBusiness);
    app.delete("/api/delBusiness/:bid", deleteBusiness);
    app.get('/api/getAllDiscounts/', getAllDiscounts);
    app.get("/api/getbusiness/:hid", findhotelInBusiness);

    function findhotelInBusiness(req,res) {
        var hotelId = req.params.hid;
        model.businessModel
            .findhotelInBusiness(hotelId)
            .then(function (response) {
                res.send(response);
            })
    }

    function getAllDiscounts(req, res) {
        model.businessModel.findDiscounts()
            .then(function (discounts) {
                res.send(discounts);
            })
    }
    function findBusinessByHotelId(req, res) {
        console.log("Found reviews");
        var hotelId = req.params.hid;
        return BusinessModel
            .findAllDiscounts(hotelId)
            .then(function (discounts) {
                //console.log(reviews);
                res.json(discounts);
            });
    }

 /*   function createBusiness(req,res){
        console.log("server side create business");
        var userId = req.params.uid;
        console.log("userId inside server" + userId);
        var hotelBusiness = req.body;
        var hotelId = hotelBusiness._hotel;

        var BusinessNew = {
            discount:hotelBusiness.comment,
            hotelId: hotelId
        }
        return BusinessModel
            .createBusiness(userId,hotelId,BusinessNew)
            .then(function (business) {
                    console.log(business);
                    res.json(business);
                },
                function (error) {
                    console.log("BUGUGGGG")
                    res.sendStatus(400).send(error);
                });
    }*/

    function createBusiness(req,res){
        console.log("server side create review");
        var userId = req.params.uid;
        var hotelReview = req.body;
        var hotelId = req.params.hotelId;

        var reviewNew = {
            discount:hotelReview.comment,
            hotelId: hotelId,
            hotelName : hotelReview.hotelName,
            hotelCity:hotelReview.hotelCity
        }
        return BusinessModel
            .createBusiness(userId,hotelId,reviewNew)
            .then(function (review) {
                    console.log(review);
                    res.json(review);
                },
                function (error) {
                    console.log("BUGUGGGG");
                    res.sendStatus(400).send(error);
                });
    }

    function findBusinessById(req, res){
        //console.log("in website by id")
        var businessId = req.params.bid;
        BusinessModel
            .findBusinessById(businessId)
            .then(function (business) {
                    //console.log(review);
                    res.send(business);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function updateBusiness(req, res){
        console.log("In update");
        var business = req.body;
        var businessId = req.params.bid;
        BusinessModel
            .updateBusiness(businessId, business)
            .then(function (data) {
                    //console.log(website);
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
        //res.send('0');
    }

    function deleteBusiness(req, res){
        var businessId = req.params.bid;
        BusinessModel
            .deleteBusiness(businessId)
            .then(function (data) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function findAllWebsitesForUser(req,res) {
        var userId = req.params.userId;
        //var websites = []
        WebsiteModel
            .findWebsitesForUser(userId)
            .then(function (websites) {
                    res.json(websites);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                })
    }

}