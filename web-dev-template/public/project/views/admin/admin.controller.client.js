/**
 * Created by shrad on 4/4/2017.
 */

(function() {
    angular
        .module("MyHotelApp")
        .controller("AdminLoginController", AdminLoginController)
        .controller("AdminRegisterController", AdminRegisterController)
        .controller("AdminProfileController", AdminProfileController)

    function AdminLoginController($location, UserService) {
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
                var promise = UserService.login(username, password);
                promise
                    .success(function (user) {
                        if (user === '0' || user.role != 'ADMIN') {
                            vm.alert = "No such Admin";
                        }
                        else {
                            $location.url("/userAdmin/" + user._id);
                        }
                    })
                    .error(function () {
                    });
            }
        }
    }
    function AdminRegisterController($rootScope,$location,UserService) {
        var vm = this;
        console.log("In project user controller");

        vm.createUser = createUser;
        function createUser(user) {
            user.role = 'ADMIN';
            UserService
                .register(user)
                .then(
                    function (response) {
                        console.log(response);
                        var user = response.data;
                        $rootScope.currentUser = user;
                        $location.url("/userAdmin/" + user._id);
                    });
        }
    }
    function AdminProfileController($routeParams, UserService,$location,HotelService,ReviewService) {
        var vm = this;
        var model = this;
        vm.userId = $routeParams["uid"];
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
            HotelService.updateHotel(hotel._id,hotel)
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
                        },function (err) {
                            res.sendStatus(404).send(err);
                        })
                },function (err) {
                    res.sendStatus(err);
                })
        }
        function deleteHotelAdmin(hotel) {
            HotelService
                .deleteHotelAdmin(hotel._id)
                .then(function (hotel) {
                    HotelService
                        .getAllHotels()
                        .then(function (hotels) {
                         console.log("set hotels");
                         vm.hotels = hotels;
                         getAllHotels();
                        },function (err) {
                        res.sendStatus(404).send(err);
                    })
                },function (err) {
                res.sendStatus(err);
            })
        }
        function deleteUserAdmin(user) {
            UserService
                .deleteUserAdmin(user._id)
                .then(function (user) {
                    UserService
                        .getAllRegUsers()
                        .then(function (users) {
                         console.log("set user");
                         vm.users = users;
                         getAllRegUsers();
                        },function (err) {
                        res.sendStatus(404).send(err);
                    })
                },function (err) {
                res.sendStatus(err);
            })
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
            ReviewService.updateReview(review._id,review)
                .success(function (review) {
                    vm.review = review;
                    getAllReviews();
                })
        }
        function update(user) {
            console.log(user._id);
            UserService.updateUser(user._id,user)
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
        vm.logout = logout;

        function logout() {
            UserService.logout()
                .success(function () {
                    $location.url("/loginAdmin");
                })
        }
    }
})();