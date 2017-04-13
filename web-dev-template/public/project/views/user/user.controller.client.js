(function() {
    angular
        .module("MyHotelApp")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController)
        .controller("profileOtherController",profileOtherController)

    function profileOtherController($routeParams, UserService,$location, HotelService) {
        var vm = this;
        function init() {
            vm.series = [];
            vm.followers = [];
            vm.following_users = [];
            vm.hotels = [];
            vm.userId = $routeParams['uid1'];
            vm.secondUserId = $routeParams['uid2'];
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
                var series_id = vm.secondUser.likes[like];
                SeriesService.findSeriesById(series_id)
                    .then(function (series) {
                        vm.series.push(series);
                    });
            }
        }

        function searchHotel(searchTerm) {
            if (vm.user._id == null)
                $location.url("/search/" + searchTerm);
            else {
                $location.url("/user/" + vm.user._id + "/search/" + searchTerm);
            }

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

        function logout() {
            UserService.logout()
                .success(function () {
                    $location.url("/login");
                })
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

        function LoginController($location, UserService) {
            var vm = this;
            vm.login = login;

            function login(user) {
                console.log("login called");
                var promise = UserService.findUserByCredentials(user.username, user.password);
                promise
                    .success(function (user) {
                        var loginuser = user;
                        $rootScope.currentUser = user;
                        console.log(loginuser);
                        if (loginuser != null) {
                            $location.url("/user/" + loginuser._id);
                        }
                        else {
                            vm.error = "user not found";
                        }
                    })
                    .error(function (err) {
                        vm.error = "user not found";
                        console.log(vm.error)
                    });
            }

        }
    function RegisterController($scope,$rootScope,$location,UserService) {
        var vm = this;

        vm.createUser = createUser;

        function createUser(user) {
            console.log("create user called");
            if(!$scope.register.$invalid && user.password == user.veryPassword){
                UserService
                    .register(user)
                    .then(
                        function (response) {
                            console.log("user registered");
                            var user = response.data;
                            $rootScope.currentUser = user;
                            $location.url("/user/" + user._id);
                        });
            }
            else{
                vm.veryPasswordAlert = "Passwords do not match";
            }
            }
        }


        function ProfileController($routeParams, UserService,$location,HotelService,CityService) {
            var vm = this;
            vm.userId = $routeParams["uid"];
            vm.hotels = [];
            console.log("Profile controller called");
            console.log(vm.userId);
            function init() {
                UserService
                    .findUserById(vm.userId)
                    .success(function(user){
                        if(user != null){
                            vm.user = user;
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

            function searchHotel(city,hotelId) {
                vm.cityId;
                console.log("&&&&&&&&&&&" + city);

                CityService.findCityIdByCityName(city)
                    .success(function (city1) {
                        console.log("%%%%%"+city1["City ID"]);
                        vm.cityId = city1["City ID"];
                        console.log(vm.cityId);
                        vm.hotelId = hotelId;
                        if (vm.userId == null)
                            $location.url("user/city/"+vm.cityId +"/hotelDetails/" + vm.hotelId);
                        else {
                            $location.url("/user/"+ vm.userId + "/city/" + vm.cityId + "/hotelDetails/" + vm.hotelId);
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
                var url = "views/user/profile-" + choice + ".view.client.html";
                return url;

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

            function logout() {
                UserService.logout()
                    .success(function () {
                        $location.url("/login");
                    })
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
})();