/**
 * Created by shrad on 4/9/2017.
 */

(function() {
    angular
        .module("MyHotelApp")
        .controller("AgencyLoginController", AgencyLoginController)
        .controller("AgencyRegisterController", AgencyRegisterController)
        .controller("AgencyProfileController", AgencyProfileController)

    function AgencyLoginController($location, AgencyService) {
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
                var promise = AgencyService.login(username, password);
                promise
                    .success(function (user) {
                        if (user === '0') {
                            vm.alert = "No such Agency";
                        }
                        else {
                            $location.url("/AgencyUser/" + user._id);
                        }
                    })
                    .error(function () {
                    });
            }
        }
    }
    function AgencyRegisterController($rootScope,$location,AgencyService) {
        var vm = this;
        console.log("In project agency controller");

        vm.createAgency = createAgency;
        function createAgency(user) {
            AgencyService
                .register(user)
                .then(
                    function (response) {
                        console.log(response);
                        var user = response.data;
                        $rootScope.currentUser = user;
                        $location.url("/AgencyUser/" + user._id);
                    });
        }
    }
    function AgencyProfileController($routeParams, UserService,$location,HotelService,ReviewService,AgencyService) {
        var vm = this;
        var model = this;
        vm.userId = $routeParams["uid"];
     /*   vm.getAllRegUsers = getAllRegUsers;
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
        vm.select_review = select_review;*/

        // Review details
        vm.getAllReviews = getAllReviews;

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
                })
        }

        function AddNewHotel(hotel) {
            HotelService.createHotelAdmin(hotel)
                .success(function (hotel) {
                    vm.hotel = hotel;
                })
        }
        function getAllHotels() {
            HotelService.getAllHotels()
                .success(function (hotels) {
                    vm.hotels = hotels;
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
        function update(user) {
            console.log(user._id);
            UserService.updateUser(user._id,user)
                .success(function (user) {
                    vm.user = user;
                })
        }

        function AddNewUser(user) {
            UserService.createUserAdmin(user)
                .success(function (user) {
                    vm.user = user;
                })
        }


        function deleteUser(userId) {
            UserService.deleteUser(userId)
                .success(function (data) {
                    console.log(data);
                    UserService.getAllUsers()
                        .success(function (users) {
                            vm.users = users;

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
        }
        init();
        vm.logout = logout;

        function logout() {
            UserService.logout()
                .success(function () {
                    $location.url("/loginAgency");
                })
        }
    }
})();