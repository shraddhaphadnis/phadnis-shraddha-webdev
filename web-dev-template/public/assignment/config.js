(function () {
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider,$httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

        $routeProvider
            .when("/login",{
                templateUrl: 'views/user/template/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when("/",{
                templateUrl: 'views/user/template/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when("#/",{
                templateUrl: 'views/user/template/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when("/register",{
                templateUrl: 'views/user/template/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when("/user/:uid",{
                templateUrl: 'views/user/template/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model'
            })
            .when("/profile",{
                templateUrl: 'views/user/template/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model'
            })
            .when("/profile/:uid",{
                templateUrl: 'views/user/template/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website",{
                templateUrl: 'views/website/template/website-list.view.client.html',
                controller: "WebsiteListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/new",{
                templateUrl: 'views/website/template/website-new.view.client.html',
                controller: "WebsiteNewController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid",{
                templateUrl: 'views/website/template/website-edit.view.client.html',
                controller: "WebsiteEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page",{
                templateUrl: 'views/page/template/page-list.view.client.html',
                controller: "PageListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/new",{
                templateUrl: 'views/page/template/page-new.view.client.html',
                controller: "PageNewController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid",{
                templateUrl: 'views/page/template/page-edit.view.client.html',
                controller: "PageEditController",
                controllerAs: "model"
            })
            // now do all the page routes using websites as an example
            .when("/user/:uid/website/:wid/page/:pid/widget",{
                templateUrl: 'views/widget/template/widget-list.view.client.html',
                controller: "WidgetListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new",{
                templateUrl: 'views/widget/template/widget-chooser.view.client.html',
                controller: "NewWidgetController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid",{
                templateUrl: 'views/widget/template/widget-edit.view.client.html',
                controller: "EditWidgetController",
                controllerAs: "model"
            })
            .otherwise({
                templateUrl: 'views/user/template/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            });
    }
})();