(function(){
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function login(user) {
            console.log("login called");
            var promise = UserService.findUserByCredentials(user.username, user.password);
            promise
                .success(function (user) {
                    var loginuser = user;
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
                });
        }
    }
})();