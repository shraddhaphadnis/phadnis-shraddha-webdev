(function() {
    angular
        .module("MyHotelApp")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController)
        .controller("RestaurantSearchController",RestaurantSearchController)

        function RestaurantSearchController($routeParams,$location, SearchService, UserService) {
            var vm=this;
            vm.searchRestuarants = searchRestuarants;

            /*function init() {
               // vm.userId = $routeParams.uid;
               // vm.websiteId = $routeParams.wid;
               // vm.pageId = $routeParams.pid;
               // vm.widgetId = $routeParams.wgid;

            }
            init();*/
            function searchRestuarants(searchTerm) {
                SearchService
                    .searchRestuarants(searchTerm)
                    .then(function (response) {
                        data = response.data;
                        data = JSON.parse(data);
                        vm.restaurants = data.restaurants;
                    });
            }
        }
        function LoginController($location, UserService) {
            var vm = this;
            vm.login = login;


            function login(username,password){
                if(!username){
                    vm.alert = "Username required";
                }
                else if(!password){
                    vm.alert = "Password required";
                }
                else if (!username && !password){
                    vm.alert = "Username and Password required";
                }
                else{
                    var promise = UserService.login(username, password);

                    //var promise = UserService.findUserByCredentials(username,password);
                    promise
                        .success(function (user) {
                            console.log("Inside success of login")

                            if (user === '0') {
                                vm.alert = "No such user";
                            }
                            else {
                                $location.url("user/" + user._id);
                            }
                        })
                        .error(function () {

                        });
                }

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


        function ProfileController($routeParams, UserService,$location) {
            var vm = this;
            vm.userId = $routeParams["uid"];

            console.log(vm.userId);
            function init() {
                UserService
                    .findCurrentUser()
                    .success(function(user){
                        if(user != null){
                            vm.user = user;
                            vm.followerSize = vm.user.followers.length;
                            vm.followingSize = vm.user.following.length;
                            console.log(vm.followerSize);
                        }
                    })
                    .error(function(){

                    });
            }
            init();
            vm.updateUser = updateUser;
            vm.deleteUser = deleteUser;
            vm.logout = logout;
            vm.getUserByIds = getUserByIds;
            vm.getfollowingByIds = getfollowingByIds;

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