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
    function AdminProfileController($routeParams, UserService,$location,HotelService) {
        var vm = this;
        var model = this;
        vm.userId = $routeParams["uid"];
        vm.getAllRegUsers = getAllRegUsers;
        vm.deleteUser = deleteUser;
        vm.AddNewUser = AddNewUser;
        vm.update = update;
        vm.select = select;
        vm.deleteUserAdmin = deleteUserAdmin;
        // Hotel details
        vm.getAllHotels = getAllHotels;
        vm.select_hotel = select_hotel;

        function getAllHotels() {
            HotelService.getAllHotels()
                .success(function (hotels) {
                    vm.hotels = hotels;
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
                        }),function (err) {
                        res.sendStatus(404).send(err);
                    }
                }),function (err) {
                res.sendStatus(err);
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
                    $location.url("/loginAdmin");
                })
        }
    }
})();