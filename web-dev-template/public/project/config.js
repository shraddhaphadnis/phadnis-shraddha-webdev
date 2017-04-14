(function() {
    angular
        .module("MyHotelApp")
        .config(Config);

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
        return $http.get('/api/loggedin').success(function(user) {
            $rootScope.errorMessage = null;
            if (user !== '0') {
                $rootScope.currentUser = user;
            } else {
                $location.url('/login');
            }
        });
    };
    function Config($routeProvider, $httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

        $routeProvider
            .when("/home", {
                templateUrl: 'views/user/homepage.html',
                controller: "CityListController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
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

            .when("/user/homepage/", {
                templateUrl: "views/user/user_home.html",
                controller: "CityListController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/home/city", {
                templateUrl: "views/hotel/hotel-list.view.client.html",
                controller: "HotelListController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/city/hotelDetails/",{
                templateUrl: "views/hotel/hotel-details.view.client.html",
                controller: "HotelDetailsController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/city/hotelDetails/",{
                templateUrl: "views/hotel/hotel-details.view.client.html",
                controller: "HotelDetailsController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/city", {
                templateUrl: "views/hotel/hotel-list.view.client.html",
                controller: "HotelListController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/review/new",{
                templateUrl: "views/review/new-review.view.client.html",
                controller: "NewReviewController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/city/hotelDetails/reviewEdit/",{
                templateUrl: "views/review/edit-review.view.client.html",
                controller: "EditReviewController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/city/:cid/hotel/:hid", {
                templateUrl: 'views/hotel/hotel-details.view.client.html',
                controller: "HotelDetailsController",
                controllerAs: "model"
            })

            .when("/user/city/hotelDetails/newReview", {
                templateUrl: 'views/hotel/hotel-details.view.client.html',
                controller: "HotelDetailsController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user1/secondUserProfile", {
                templateUrl: 'views/user/profile-other-user-view.client.html',
                controller: "profileOtherController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .when("/user/city/hotelDetails/business",{
                templateUrl: "views/business/new-business.view.client.html",
                controller: "NewBusinessController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/city/hotel/business/edit",{
                templateUrl: "views/business/edit-business.view.client.html",
                controller: "EditBusinessController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .when("/user/LIKE",{
                templateUrl: "views/user/profile-LIKE.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/LIKE",{
                templateUrl: "views/user/profile-other-LIKE.view.client.html",
                controller: "profileOtherController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/FOLLOWING",{
                templateUrl: "views/user/profile-FOLLOWING.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/FOLLOWING",{
                templateUrl: "views/user/profile-other-FOLLOWING.view.client.html",
                controller: "profileOtherController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/FOLLOWER",{
                templateUrl: "views/user/profile-FOLLOWER.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/FOLLOWER",{
                templateUrl: "views/user/profile-other-FOLLOWER.view.client.html",
                controller: "profileOtherController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/OWNED",{
                templateUrl: "views/user/profile-OWNED.view.client.html",
                controller: "profileOwnerController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
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
            /*.when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })*/
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
                    loggedin: checkLoggedin
                }
            })

            .when("/owner", {
                templateUrl: "views/user/owner.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })

         /*   .when("/owner/:uid", {
                templateUrl: "views/user/owner.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })*/


            /*.when("/userAdmin/:uid", {
                templateUrl: "views/admin/admin.home.view.html",
                controller: "AdminProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })*/
            .otherwise({
                redirectTo : "/login"
            });

    /*    function checkLoggedin($q, $timeout, $http, $location, $rootScope) {
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
        }*/
    }
})();