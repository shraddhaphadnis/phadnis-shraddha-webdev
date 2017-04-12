module.exports = function(app, model){

    var ReviewModel = model.reviewModel;
    app.get("/api/hotel/review/:hid", findReviewByHotelId);
    app.get("/api/review/:rid", findReviewById);
    app.post("/api/user/:uid/hotel/:hotelId/review", createReview);
    app.put("/api/editReview/:rid", updateReview);
    app.delete("/api/delReview/:rid", deleteReview);
    app.get('/api/getAllReviews/', getAllReviews);
    app.delete('/api/admin/review/:reviewId',deleteCommentAdmin);
    app.post("/api/project/admin/review",createAdminReview);


    function createAdminReview(req, res) {
        var newUser = req.body;
        console.log(newUser);
        model.userModel
            .findUse(newUser.username)
            .then(
                function (user) {
                    console.log("*********"+user);
                    // if the user does not already exist
                    if (user == null) {
                        // create a new user
                        return model.userModel.createUser(newUser)
                            .then(
                                function () {
                                    return model.userModel.findAllUsers();
                                },
                                function (err) {
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return model.userModel.findAllUsers();
                    }
                },
                function (err) {
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

    function deleteCommentAdmin(req, res) {
        model.reviewModel
            .deleteReview(req.params.reviewId)
            .then(
                function (review) {
                    return model.reviewModel.findAllReviews();
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (reviews) {
                    res.json(reviews);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getAllReviews(req, res) {
        model.reviewModel.findReviews()
            .then(function (reviews) {
                console.log("response reviews" +reviews);
                res.send(reviews);
            })
    }
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
        var hotelId = req.params.hotelId;

        var reviewNew = {
            comment:hotelReview.comment,
            hotelId: hotelId,
            hotelName : hotelReview.hotelName,
            hotelCity:hotelReview.hotelCity
        }
        return ReviewModel
            .createReview(userId,hotelId,reviewNew)
            .then(function (review) {
                    console.log(review);
                    res.json(review);
                },
                function (error) {
                console.log("BUGUGGGG");
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