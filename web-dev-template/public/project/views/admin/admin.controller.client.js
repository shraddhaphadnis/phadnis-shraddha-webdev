/**
 * Created by shrad on 4/4/2017.
 */

(function() {
    angular
        .module("MyHotelApp")
        .controller("AdminLoginController", AdminLoginController)
        .controller("AdminRegisterController", AdminRegisterController)
        .controller("AdminProfileController", AdminProfileController)

    function AdminLoginController($location, UserService,loggedin) {
        var vm = this;
        vm.login = login;

        function login(username,password){
            if(!username){
                vm.alert = "Username is required";
            }
            else if(!password){
                vm.alert = "Password is required";
            }
            else if (!username && !password){
                vm.alert = "Username and Password required";
            }
            else{
                var promise = UserService.login(user);
                promise
                    .success(function (user) {
                        if (user === '0' || user.role != 'ADMIN') {
                            vm.alert = "No such Admin";
                        }
                        else {
                            $location.url("/userAdmin");
                        }
                    })
                    .error(function () {
                    });
            }
        }
    }
    function AdminRegisterController($rootScope,$location,UserService,loggedin) {
        var vm = this;
        console.log("In project user controller");

        vm.createUser = createUser;
        function createUser(user) {
            //user.role = 'ADMIN';
            UserService
                .register(user)
                .then(
                    function (response) {
                        console.log(response);
                        var user = response.data;
                        $rootScope.userId = user._id;
                        $location.url("/userAdmin/profile");
                    });
        }
    }
    function AdminProfileController($routeParams, UserService,$location,HotelService,ReviewService,CityService,loggedin,$rootScope,BusinessService) {
        var vm = this;
        var model = this;
        vm.userId = $rootScope.userId;
        vm.user = loggedin.data;
        vm.getAllRegUsers = getAllRegUsers;
        vm.deleteUser = deleteUser;
        vm.AddNewUser = AddNewUser;
        vm.AddNewHotel = AddNewHotel;
        vm.update = update;
        vm.select = select;
        vm.deleteUserAdmin = deleteUserAdmin;
        vm.deleteHotelAdmin = deleteHotelAdmin;
        // Hotel details
        vm.getAllHotels = getAllHotels;
        vm.select_hotel = select_hotel;
        vm.updateHotel = updateHotel;

        // Review details
        vm.getAllReviews = getAllReviews;
        vm.updateComment = updateComment;
        vm.select_review = select_review;
        vm.AddComment = AddComment;
        vm.deleteCommentAdmin = deleteCommentAdmin;
        vm.logout = logout;

        function logout(){
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                )
        }


        function getAllReviews() {
            ReviewService
                .getAllReviews()
                .success(function (comments) {
                    vm.comments = comments;
                    console.log("vm.comments" + vm.comments);
                })
        }

        function updateHotel(hotel) {
            console.log(hotel._id);
            HotelService.updateHotel(hotel._id, hotel)
                .success(function (hotel) {
                    vm.hotel = hotel;
                    getAllHotels();

                })
        }

        function AddNewHotel(hotel) {
            HotelService.createHotelAdmin(hotel)
                .success(function (hotel) {
                    vm.hotel = hotel;
                    getAllHotels();
                })
        }

        function getAllHotels() {
            HotelService.getAllHotels()
                .success(function (hotels) {
                    vm.hotels = hotels;
                })
        }

        function deleteCommentAdmin(review) {
            ReviewService
                .deleteCommentAdmin(review._id)
                .then(function (review) {
                    ReviewService
                        .getAllReviews()
                        .then(function (reviews) {
                            console.log("set reviews");
                            vm.reviews = reviews;
                            getAllReviews();
                        }, function (err) {
                            res.sendStatus(404).send(err);
                        })
                }, function (err) {
                    res.sendStatus(err);
                })
        }

        function deleteHotelAdmin(hotel) {
            HotelService
                .deleteHotelAdmin(hotel._id)
                .then(function (response) {
                    console.log("***" + response);
                    UserService
                        .findUserWhoLikedHotel(hotel.hotelId)
                        .then(function (hotel1) {
                            CityService
                                .findCityIdByCityName(hotel.hotelCity)
                                .then(function (city1) {
                                    console.log(city1);
                                    vm.cityId = city1.data["City ID"];
                                    console.log(vm.cityId);
                                    var usersWhoLiked = hotel1.data;
                                    for (var i in usersWhoLiked) {
                                        UserService
                                            .undoLikeHotel(usersWhoLiked[i]._id, hotel.hotelId, vm.cityId);
                                    }
                                    HotelService
                                        .getAllHotels()
                                        .then(function (hotels) {
                                            console.log("set hotels");
                                            vm.hotels = hotels;
                                            getAllHotels();
                                        }, function (err) {
                                            res.sendStatus(404).send(err);
                                        })
                                }, function (err) {
                                    res.sendStatus(err);
                                })
                        }, function (err) {
                            res.sendStatus(err);
                        });
                })
        }

       /* function deleteUserAdmin(user) {
            UserService
                .deleteUserAdmin(user._id)
                .then(function (user) {
                    UserService
                        .getAllRegUsers()
                        .then(function (users) {
                            console.log("set user");
                            vm.users = users;
                            getAllRegUsers();
                        }, function (err) {
                            res.sendStatus(404).send(err);
                        })
                }, function (err) {
                    res.sendStatus(err);
                })
        }*/
        function deleteUserAdmin(user) {
            console.log("delete user called in owner controller");
            var answer = confirm("Are you sure?");
            if (answer) {
                UserService
                    .deleteUser(user._id)
                    .then(function () {
                        UserService.findUsersToDeleteFromFollowers(user._id)
                            .then(function (response1) {
                                var deleteFromFollowers=response1.data;
                                deleteFromFollowers.forEach(function (element, index, array) {
                                    UserService.removeFromFollowers(deleteFromFollowers[index]._id, user._id);
                                })
                                UserService.findUsersToDeleteFromFollowing(user._id)
                                    .then(function (response2) {
                                        var deleteFromFollowing=response2.data;
                                        deleteFromFollowing.forEach(function (element, index, array) {
                                            UserService.removeFromFollowing(deleteFromFollowing[index]._id,user._id);
                                        })
                                    });
                            });
                    })
                    .then(function () {
                        if(user.role=="OWNER") {
                            console.log("user role set as owner in owner controller");
                            BusinessService.findBusinessByUser(user.username)
                                .then(function (business) {
                                    if (business.length == 0) {
                                        UserService.getAllRegUsers()
                                            .success(function (user) {
                                                vm.users = user;
                                            })
                                    }
                                    else {
                                        for (b in business.data) {
                                            BusinessService.deleteBusiness(business.data[b]._id)
                                                .success(function () {
                                                    UserService.getAllRegUsers()
                                                        .success(function (user) {
                                                            vm.users = user;
                                                        })
                                                })
                                        }
                                    }
                                })
                        }
                        else{
                            UserService.getAllRegUsers()
                                .success(function (user) {
                                    vm.users = user;
                                })
                        }

                    })
            }
        }

        function select(user) {
            model.inputUser = angular.copy(user);
            model.selected = 0;
        }

        function select_hotel(hotel) {
            model.inputHotel = angular.copy(hotel);
            model.selected = 0;
        }

        function select_review(review) {
            model.inputReview = angular.copy(review);
            model.selected = 0;
        }

        function updateComment(review) {
            console.log(review._id);
            ReviewService.updateReview(review._id, review)
                .success(function (review) {
                    vm.review = review;
                    getAllReviews();
                })
        }

        function update(user) {
            console.log(user._id);
            UserService.updateUser(user._id, user)
                .success(function (user) {
                    vm.user = user;
                    getAllRegUsers();
                })
        }

        function AddNewUser(user) {
            UserService.createUserAdmin(user)
                .success(function (user) {
                    vm.user = user;
                    getAllRegUsers();
                })
        }

        function AddComment(review) {
            ReviewService.createAdminReview(review)
                .success(function (review) {
                    vm.review = review;
                })
        }


        function deleteUser(userId) {
            UserService.deleteUser(userId)
                .success(function (data) {
                    console.log(data);
                    UserService.getAllUsers()
                        .success(function (users) {
                            vm.users = users;
                            getAllRegUsers();
                        })
                })
        }

        function getAllRegUsers() {
            UserService.getAllRegUsers()
                .success(function (users) {
                    vm.users = users;
                })
        }

        function init() {
            UserService
                .findCurrentUser()
                .success(function (user) {
                    if (user != null) {
                        vm.user = user;
                    }
                })
                .error(function () {
                });
            /* HotelService
             .findCurrentHotel()
             .success(function (hotel) {
             if(hotel != null) {
             vm.hotel = hotel;
             }
             })
             .error(function () {

             });*/
            getAllRegUsers();
            getAllHotels();
            getAllReviews();
        }

        init();
    }
})();