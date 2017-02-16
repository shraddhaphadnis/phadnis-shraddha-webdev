(function(){
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(UserService, $location) {
        var vm = this;
        vm.register = register;

        function register(user) {
            var registerUser = UserService.findUserByCredentials(user.username,user.password);
            if (registerUser == null) {
                newuser = UserService.createUser(user);
                $location.url('/user/' + newuser._id);
            }
            else{
                vm.error("User already exists")
            }
        }
    }
})();

