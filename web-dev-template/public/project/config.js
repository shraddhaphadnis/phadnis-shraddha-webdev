(function() {
    angular
        .module("MyHotelApp")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: 'views/user/homepage.html',
                controller: "CityListController",
                controllerAs: "model"
            })

            .when("/user/:uid/search",{
                templateUrl: "views/search/search.city.html",
                controller: "CityListController",
                controllerAs: "model"
            })
            .when("/hotel/:searchTerm", {
                templateUrl: 'views/user/homepage.html',
                controller: "CityListController",
                controllerAs: "model"
            })
            .when("/user/:uid/city/:cid/hotel/:searchTerm", {
                templateUrl: 'views/user/homepage.html',
                controller: "CityListController",
                controllerAs: "model"
            })

            .when("/user/home",{
                templateUrl: "views/user/homepage.html",
                controller: "CityListController",
                controllerAs: "model"

            })

            .when("/user/:uid/home", {
                templateUrl: "views/user/user_home.html",
                controller: "CityListController",
                controllerAs: "model"
            })
            .when("/user/city/:cid", {
                templateUrl: "views/hotel/hotel-list.view.client.html",
                controller: "HotelListController",
                controllerAs: "model"
            })
            .when("/user/city/:cid/hotelDetails/:hid",{
                templateUrl: "views/hotel/hotel-details.view.client.html",
                controller: "HotelDetailsController",
                controllerAs: "model"
            })
            .when("/user/:uid/city/:cid/hotelDetails/:hid",{
                templateUrl: "views/hotel/hotel-details.view.client.html",
                controller: "HotelDetailsController",
                controllerAs: "model"
            })
            .when("/user/:uid/city/:cid", {
                templateUrl: "views/hotel/hotel-list.view.client.html",
                controller: "HotelListController",
                controllerAs: "model"
            })
            .when("/user/:uid/city/:cid/hotel/:hid/new",{
                templateUrl: "views/review/new-review.view.client.html",
                controller: "NewReviewController",
                controllerAs: "model"
            })
            .when("/user/:uid/city/:cid/hotel/:hid/review/:rid/edit",{
                templateUrl: "views/review/edit-review.view.client.html",
                controller: "EditReviewController",
                controllerAs: "model"
            })
            .when("/city/:cid/hotel/:hid", {
                templateUrl: 'views/hotel/hotel-details.view.client.html',
                controller: "HotelDetailsController",
                controllerAs: "model"
            })

            .when("/user/:uid/city/:cid/hotel/:hid", {
                templateUrl: 'views/hotel/hotel-details.view.client.html',
                controller: "HotelDetailsController",
                controllerAs: "model"
            })
            .when("/user1/:uid1/secondUser/:uid2", {
                templateUrl: 'views/user/profile-other-user-view.client.html',
                controller: "profileOtherController",
                controllerAs: "model"
            })

            .when("/user/:uid/city/:cid/hotel/:hid/business",{
                templateUrl: "views/business/new-business.view.client.html",
                controller: "NewBusinessController",
                controllerAs: "model"
            })
            .when("/user/:uid/city/:cid/hotel/:hid/business/:bid/edit",{
                templateUrl: "views/business/edit-business.view.client.html",
                controller: "EditBusinessController",
                controllerAs: "model"
            })

            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/loginAdmin", {
                templateUrl: "views/admin/admin.login.view.html",
                controller: "AdminLoginController",
                controllerAs: "model"
            })
           /* .when("/loginAgency", {
                templateUrl: "views/agency/travel.agent.login.view.html",
                controller: "AgencyLoginController",
                controllerAs: "model"
            })*/
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/registerAdmin", {
                templateUrl: "views/admin/admin.register.view.html",
                controller: "AdminRegisterController",
                controllerAs: "model"
            })
           /* .when("/registerAgent", {
                templateUrl: "views/agency/agent.register.view.html",
                controller: "AgentRegisterController",
                controllerAs: "model"
            })*/
            .when("/user", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"

            })
            .when("/profile",{
                templateUrl: 'views/user/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'model'
            })
            .when("/profile/:uid",{
                templateUrl: 'views/user/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'model'
            })

            .when("/userAdmin", {
                templateUrl: "views/admin/admin.home.view.html",
                controller: "AdminProfileController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
           /* .when("/AgencyUser", {
                templateUrl: "views/admin/agency.home.html",
                controller: "AgencyProfileController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/AgencyUser/:uid", {
                templateUrl: "views/agency/agency.home.view.html",
                controller: "AgencyProfileController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })*/


            .when("/userAdmin/:uid", {
                templateUrl: "views/admin/admin.home.view.html",
                controller: "AdminProfileController",
                controllerAs: "model",
                resolve: {
                    checkAdmin: checkAdmin
                }
            })
            .otherwise({
                redirectTo : "/login"
            });

        function checkLoggedin($q, $timeout, $http, $location, $rootScope) {
            var deferred = $q.defer();
            $http.get('/api/loggedin').success(function(user) {
                $rootScope.errorMessage = null;
                if (user !== '0') {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                    $location.url('/user/'+$rootScope.currentUser._id);
                } else {
                    deferred.reject();
                    $location.url('/');
                }
            });
            return deferred.promise;
        };

        function checkLogin($q, UserService, $location) {
            var deferred = $q.defer();
            UserService
                .checkLogin()
                .success(function (user) {
                    if(user != '0')
                        deferred.resolve();
                    else {
                        deferred.reject();
                        $location.url("/login");
                    }

                });
            return deferred._promise;
        }

        function checkAdmin($q, UserService, $location) {
            var deferred = $q.defer();
            UserService
                .checkAdmin()
                .success(function (user) {
                    if(user != '0')
                        deferred.resolve();
                    else {
                        deferred.reject();
                        $location.url("/login");
                    }
                });
            return deferred._promise;
        }
    }
})();