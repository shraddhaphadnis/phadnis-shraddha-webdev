module.exports = function(app, model){

    var ReviewModel = model.reviewModel;

    app.get("/api/hotel/review/:hid", findReviewByHotelId);
    app.get("/api/review/:rid", findReviewById);
    app.post("/api/user/:uid/review", createReview);
    app.put("/api/editReview/:rid", updateReview);
    app.delete("/api/delReview/:rid", deleteReview);


    function findReviewByHotelId(req, res) {
        //console.log("Found reviews");
        var hotelId = req.params.hid;
        return ReviewModel
                    .findAllReviews(hotelId)
                    .then(function (reviews) {
                        //console.log(reviews);
                        res.json(reviews);
                    });
    }

    function createReview(req,res){
        console.log("server side create review");
        var userId = req.params.uid;
        var hotelReview = req.body;
        var hotelId = hotelReview._hotel;
        var reviewNew = {
            comment:hotelReview.comment,
            hotelId: hotelId
        }
        return ReviewModel
            .createReview(userId,hotelId,reviewNew)
            .then(function (review) {
                    console.log(review);
                    res.json(review);
                },
                function (error) {
                console.log("BUGUGGGG")
                    res.sendStatus(400).send(error);
                });
    }

    function findReviewById(req, res){
        //console.log("in website by id")
        var reviewId = req.params.rid;
        ReviewModel
            .findReviewById(reviewId)
            .then(function (review) {
                    //console.log(review);
                    res.send(review);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function updateReview(req, res){
        console.log("In update");
        var review = req.body;
        var reviewId = req.params.rid;
        ReviewModel
            .updateReview(reviewId, review)
            .then(function (data) {
                    //console.log(website);
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
        //res.send('0');
    }

    function deleteReview(req, res){
        var reviewId = req.params.rid;
        ReviewModel
            .deleteReview(reviewId)
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