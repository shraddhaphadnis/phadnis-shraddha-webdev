(function() {
    angular
        .module("MyHotelApp")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/user/:uid/search",{
                templateUrl: "views/search/search.city.html",
                controller: "CityListController",
                controllerAs: "model"
            })
            .when("/user/:uid/home", {
                templateUrl: "views/user/user_home.html",
                controller: "CityListController",
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
            .when("/user", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/userAdmin", {
                templateUrl: "views/admin/admin.home.view.html",
                controller: "AdminProfileController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
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