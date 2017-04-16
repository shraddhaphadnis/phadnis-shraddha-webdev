(function() {
    angular
        .module("MyHotelApp")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController)
        .controller("profileOtherController",profileOtherController)
        .controller("profileOwnerController",profileOwnerController);

    function profileOwnerController($routeParams,UserService,$location, HotelService, CityService,BusinessService,loggedin,$rootScope) {
        var vm = this;
        vm.setHotel = setHotel;

        function setHotel(hotel) {
            $rootScope.cityId = hotel.cityId;
            $rootScope.hotelId = hotel.hotelId;
        }
        function init() {
            vm.business = [];
            vm.userId = loggedin.data._id;
            UserService
                .findUserById(vm.userId)
                .success((function (user) {
                    if (user.business.length == 0)
                    {
                        vm.business = [];
                    }
                    else {
                        for (b in user.business) {
                            BusinessService
                                .findBusinessById(user.business[b])
                                .success(function (businessDetails) {
                                    vm.hotelId = businessDetails.hotelId;
                                    vm.hotelName = businessDetails.hotelName;
                                    vm.hotelCity = businessDetails.hotelCity;
                                            CityService.findCityIdByCityName(vm.hotelCity)
                                                .success(function (city1) {
                                                    console.log("%%%%%"+city1["City ID"]);
                                                    vm.cityId = city1["City ID"];
                                                    console.log(vm.cityId);
                                                    newbusiness =
                                                    {
                                                        hotelId : vm.hotelId,
                                                        cityId : vm.cityId,
                                                        hotelName : vm.hotelName
                                                    }
                                                    vm.business.push(newbusiness);
                                                })
                                })
                        }
                    }
                }))
        }
        init();
    }

    function profileOtherController($routeParams, UserService,$location, HotelService,loggedin,$rootScope,CityService) {
        var vm = this;
        function init() {
            vm.series = [];
            vm.followers = [];
            vm.following_users = [];
            vm.hotels = [];
            vm.userId = loggedin.data._id;
            vm.secondUserId = $rootScope.seconduser;
            UserService
                .findUserById(vm.secondUserId)
                .success(function (user) {
                    vm.secondUser = user;
                    getLikeDetails();
                    getFollowers();
                    getFollowing();
                });
            UserService
                .findUserById(vm.userId)
                .success(function (user) {
                    vm.user = user;
                    isLoggedInUserFollowing();
                });
            vm.choice = null;

        }
        init();
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;
        vm.getUserByIds = getUserByIds;
        vm.getfollowingByIds = getfollowingByIds;
        vm.searchHotel = searchHotel;
        vm.getChoiceView = getChoiceView;
        vm.setChoice = setChoice;
        vm.getLikeDetails = getLikeDetails;
        vm.getFollowers = getFollowers;
        vm.getFollowing = getFollowing;
        vm.follow = follow;
        vm.unfollow = unfollow;
        vm.setSecondUser = setSecondUser;

        function setSecondUser(user) {
            $rootScope.seconduser = user._id;
        }

        function follow() {
            //vm.allFollowing=[];
            vm.following=false;
            UserService
                .follow(vm.userId, vm.secondUserId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        //vm.allFollowing.push(vm.secondUserId);
                        vm.following=true;
                    }

                });

        }

        function unfollow() {
            vm.allFollowing=[];

            UserService
                .unfollow(vm.userId, vm.secondUserId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    if ((status.n == 1 || status.nModified == 1) && status.ok == 1) {
                        //vm.allFollowing.push(vm.secondUserId);
                        vm.following=false;
                    }

                });

        }

        function isLoggedInUserFollowing() {
            vm.following=false;
            for(var f in vm.user.following){
                if(vm.user.following[f]==vm.secondUserId){
                    vm.following=true;
                    break;
                }
            }

        }

        function getFollowers() {
            vm.followers = [];
            for (var f in vm.secondUser.followers) {
                UserService
                    .findUserById(vm.secondUser.followers[f])
                    .success(function (user) {
                        vm.followers.push(user);
                    });
            }
        }


        function getFollowing() {
            for (var f in vm.secondUser.following) {
                UserService
                    .findUserById(vm.secondUser.following[f])
                    .success(function (user) {
                        vm.following_users.push(user);

                    });

            }
        }
        function setChoice(choice) {
            vm.choice = choice;
            if (choice == 'LIKE') {
                //getLikeDetails();
            }
            if (choice == 'FOLLOWER') {
                //getFollowers();
            }
        }

        function getChoiceView(choice) {
            var url = "";

            if(vm.userId==vm.secondUserId)
                url =  "views/user/profile-" + choice + ".view.client.html";
            else
                url = "views/user/profile-other-" + choice + ".view.client.html";
            return url;

        }

        function getLikeDetails() {
            for (var like in vm.secondUser.likes) {
                var hotelId = vm.secondUser.likes[like];
                console.log(typeof hotelId);
                HotelService.findHotelByHotelId(hotelId)
                    .then(function (hotel) {
                        console.log("**** hotel" + hotel);
                        vm.hotels.push(hotel);
                    });
            }
        }

        /*function searchHotel(searchTerm) {
            if (vm.user._id == null)
                $location.url("/search/" + searchTerm);
            else {
                $location.url("/user/" + vm.user._id + "/search/" + searchTerm);
            }

        }*/

        function searchHotel(city,hotelId) {
            vm.cityId;
            console.log("&&&&&&&&&&&" + city);

            CityService.findCityIdByCityName(city)
                .success(function (city1) {
                    console.log("%%%%%"+city1["City ID"]);
                    vm.cityId = city1["City ID"];
                    console.log(vm.cityId);
                    vm.hotelId = hotelId;
                    if (vm.userId == null) {
                        $rootScope.hotelId = vm.hotelId;
                        $rootScope.cityId = vm.cityId;
                        $location.url("/home/city/hotelDetails/");
                    }
                    else {
                        $rootScope.hotelId = vm.hotelId;
                        $rootScope.cityId = vm.cityId;
                        $location.url("/user/city/hotelDetails/");
                    }
                })
        }


        function getUserByIds(followers) {
            res = [];
            console.log(followers);
            for(id = 0;id<followers.length;id++) {
                console.log(followers[id]);
                UserService
                    .findUserById(followers[id])
                    .success(function (user) {
                        res.push(user);
                        console.log(res);
                    });
            }
            vm.res = res;
        }
        function getfollowingByIds(following) {
            flw = [];
            console.log("getfollowingByIds"+following);
            for(id = 0;id<following.length;id++) {
                console.log(following[id]);
                UserService
                    .findUserById(following[id])
                    .success(function (user) {
                        if (user!=null) {
                            flw.push(user);
                            console.log(flw);
                        }
                    });
            }
            vm.flw = flw;
        }

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
        function updateUser(userId,user){
            UserService.updateUser(userId,user)
                .success(function(user){
                    //console.log(user);
                    if(user != '0'){
                        vm.user = user;
                    }
                })
                .error(function(){
                });

        }

        function deleteUser(userId){
            UserService.deleteUser(userId)
                .success(function(response){
                    if(response == 'OK'){
                        $location.url("/login");
                    }
                })
                .error(function(){
                });
        }
    }

        function LoginController($location, UserService, $rootScope,loggedin) {
            var vm = this;
            vm.login = login;

            function login(user) {
                console.log("login called");
                var promise = UserService.login(user);
                promise
                    .then(function (response) {
                        var user = response.data;
                        if (user.role == "CUSTOMER") {
                            alert("hello");
                            $rootScope.currentUser = user;
                            $location.url("/user/");// + user._id);
                        }
                        if (user.role === "OWNER") {
                            alert("hello1");
                            $rootScope.currentUser = user;
                            $location.url("/owner/");// + user._id);
                        }
                        if (user.role === "ADMIN") {
                            alert("hello2");
                            $rootScope.currentUser = user;
                            $location.url("/userAdmin/profile");// + user._id);
                        }
                        else {
                            vm.error ("user not found");
                        }
                    }, function (err) {
                        vm.error = "user/password does not match";
                    });
            }
        }
    function RegisterController($scope,$rootScope,$location,UserService) {
        var vm = this;

        vm.createUser = createUser;

        function createUser(user) {
            console.log("create user called");
            if (!$scope.register.$invalid && user.password == user.veryPassword) {
                UserService
                    .findUserByUsername(user.username)
                    .success(function (user) {
                        vm.error = "sorry username is already taken";
                    })
                    .error(function () {
                        UserService
                            .register(user)
                            .then(
                                function (response) {
                                    console.log("user registered");
                                    var user = response.data;
                                    if (user.role == "ADMIN") {
                                        $rootScope.currentUser = user;
                                        $location.url("/userAdmin");
                                    }
                                    else if (user.role == "OWNER") {
                                        $rootScope.currentUser = user;
                                        $location.url("/owner");
                                    }
                                    else {
                                        $rootScope.currentUser = user;
                                        $location.url("/user");
                                    }
                                })
                            .error(function () {
                                vm.error = "Sorry could not register";
                            })

                    })
            }
            else {
                vm.error = "Please enter all required fields";
            }
        }
    }


        function ProfileController($routeParams, UserService,$location,HotelService,CityService,loggedin,$rootScope,BusinessService) {
            var vm = this;
            //vm.userId = $routeParams["uid"];
            vm.userId = loggedin.data._id;
            console.log(vm.userId);
            vm.secondUserId = $rootScope.Seconduser;
            vm.hotels = [];
            console.log("Profile controller called");
            console.log(vm.userId);
            function init() {
                UserService
                    .findUserById(vm.userId)
                    .success(function(user){
                        vm.user = user;
                        if(user.role == 'OWNER') {
                            console.log("user role set as owner");
                            $location.url("/owner");
                        }
                        else if(user != null) {
                            isLoggedInUserFollowing();
                            getLikeDetails();
                            getFollowers();
                            getFollowing();
                        }
                    })
                    .error(function(){

                    });
                vm.choice = null;
            }
            init();
            vm.updateUser = updateUser;
            vm.deleteUser = deleteUser;
            vm.logout = logout;
            vm.getUserByIds = getUserByIds;
            vm.getfollowingByIds = getfollowingByIds;
            vm.getChoiceView = getChoiceView;
            vm.setChoice = setChoice;
            vm.getlikeDetails = getLikeDetails;
            vm.getFollowers = getFollowers;
            vm.getFollowing = getFollowing;
            vm.searchHotel = searchHotel;
            vm.logout = logout;
            vm.setSecondUser = setSecondUser;

            function setSecondUser(user) {
                $rootScope.seconduser = user._id;
            }

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

            function searchHotel(city,hotelId) {
                vm.cityId;
                console.log("&&&&&&&&&&&" + city);

                CityService.findCityIdByCityName(city)
                    .success(function (city1) {
                        console.log("%%%%%"+city1["City ID"]);
                        vm.cityId = city1["City ID"];
                        console.log(vm.cityId);
                        vm.hotelId = hotelId;
                        if (vm.userId == null) {
                            $rootScope.hotelId = vm.hotelId;
                            $rootScope.cityId = vm.cityId;
                            $location.url("/home/city/hotelDetails/");
                        }
                        else {
                            $rootScope.hotelId = vm.hotelId;
                            $rootScope.cityId = vm.cityId;
                            $location.url("/user/city/hotelDetails/");
                        }
                    })
            }

            function isLoggedInUserFollowing() {
                vm.following=false;
                for(var f in vm.user.following){
                    if(vm.user.following[f]==vm.secondUserId){
                        vm.following=true;
                        break;
                    }
                }

            }

            function getFollowers() {
                vm.followers = [];
                for (var f in vm.user.followers) {
                    UserService
                        .findUserById(vm.user.followers[f])
                        .success(function (user) {
                            vm.followers.push(user);
                        });
                }
            }

            function getFollowing() {
                vm.following_users = [];
                for (var f in vm.user.following) {
                    UserService
                        .findUserById(vm.user.following[f])
                        .success(function (user) {
                            vm.following_users.push(user);
                        });
                }
            }

            function getLikeDetails() {
                for (var like in vm.user.likes) {
                    var hotelId = vm.user.likes[like];
                    console.log(typeof hotelId);
                    HotelService.findHotelByHotelId(hotelId)
                        .then(function (hotel) {
                            console.log("**** hotel" + hotel);
                            vm.hotels.push(hotel);
                        });
                }
            }

            function setChoice(choice) {
                vm.choice = choice;
            }

            function getChoiceView(choice) {
                console.log("get choice called" + choice);
                return "views/user/profile-" + choice + ".view.client.html";
            }


            function getUserByIds(followers) {
                res = [];
                console.log(followers);
                for(id = 0;id<followers.length;id++) {
                    console.log(followers[id]);
                    UserService
                        .findUserById(followers[id])
                        .success(function (user) {
                            res.push(user);
                            console.log(res);
                        });
                }
                vm.res = res;
            }
            function getfollowingByIds(following) {
                flw = [];
                console.log("getfollowingByIds"+following);
                for(id = 0;id<following.length;id++) {
                    console.log(following[id]);
                    UserService
                        .findUserById(following[id])
                        .success(function (user) {
                            if (user!=null) {
                                flw.push(user);
                                console.log(flw);
                            }
                        });
                }
                vm.flw = flw;
            }

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
            function updateUser(userId,user){
                UserService.updateUser(userId,user)
                    .success(function(user){
                        //console.log(user);
                        if(user != '0'){
                            vm.user = user;
                        }
                    })
                    .error(function(){
                    });

            }

         /*   function deleteUser(userId){
                UserService
                    .deleteUser(userId)
                    .success(function(response){
                        if(response == 'OK'){
                            $location.url("/login");
                        }
                    })
                    .error(function(){
                    });
            }*/

            /*function deleteUser(user) {
                console.log(user);
                UserService
                    .deleteUser(userId)
                    .then(function () {
                        UserService.findUsersToDeleteFromFollowers(userId)
                            .then(function (response1) {
                                var deleteFromFollowers = response1.data;
                                deleteFromFollowers.forEach(function (element, index, array) {
                                    UserService.removeFromFollowers(deleteFromFollowers[index]._id, userId);
                                })
                                UserService.findUsersToDeleteFromFollowing(userId)
                                    .then(function (response2) {
                                        var deleteFromFollowing = response2.data;
                                        deleteFromFollowing.forEach(function (element, index, array) {
                                            UserService.removeFromFollowing(deleteFromFollowing[index]._id, userId);
                                        })
                                    });
                            });
                    })


                                if (user.role == 'OWNER') {
                                    console.log("inside business controller");
                                    BusinessService.findBusinessByUser(user.username)
                                        .then(function (business) {
                                            if (business.length == 0) {
                                                res.send(200);
                                            }
                                            else {
                                                for (b in business) {
                                                    BusinessService
                                                        .deleteBusiness(b)
                                                        .success(function () {
                                                        })
                                                }
                                            }
                                        })
                                }
                            })
                    .then(function (response) {
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
                    });

            }*/

            function deleteUser(user) {
                console.log("delete user called" + user);
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
                                console.log("Owner %%%%");
                                BusinessService.findBusinessByUser(user.username)
                                    .then(function (business) {
                                        if (business.length == 0) {
                                            $location.url("/login");
                                        }
                                        else {
                                            for (b in business) {
                                                BusinessService.deleteBusiness(business[b]._id)
                                                    .success(function () {
                                                        $location.url("/login");
                                                    })
                                            }
                                        }
                                    })
                            }
                            else{
                                $location.url("/login");
                            }

                        })
                }
            }
        }
})();