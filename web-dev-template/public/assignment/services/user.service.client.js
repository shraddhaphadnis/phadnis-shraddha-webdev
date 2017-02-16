(function(){
    angular
        .module("WebAppMaker")
        .factory('UserService', userService);

    function userService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice", email:"alice.wonderland@com" ,  firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",  email:"bob.marley@com" ,    firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly", email:"charly@garcia@com" ,  firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", email:"jannunzi.jose@com" , firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            "users": users,
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        function createUser(user,$location) {
            var newuser = {
                username: user.username,
                password: user.password,
                _id: (new Date()).getTime().toString()
            }
            users.push(newuser);
            return newuser;

        }
        function updateUser(userId, newUser) {
            for(var u in users) {
                var user = users[u];
                if( user._id === userId ) {
                    users[u].firstName = newUser.firstName;
                    users[u].lastName = newUser.lastName;
                    return user;
                }
            }
            return null;
        }

        function findUserById(uid) {
            for(var u in users) {
                var user = users[u];
                if( user._id == uid ) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                var user = users[u];
                if( user.username === username &&
                    user.password === password) {
                    return angular.copy(user);
                }
            }
            return null;
        }
        function findUserByUsername(user) {
            for (var u in users){
                var user = users[u];
                if (user.username == username)
                {
                    return angular.copy(user)
                }
            }
            return null;
        }

        function deleteUser(uid) {
            for(var u in users) {
                if(users[u]._id === uid) {
                    users.splice(u, 1);
                }
            }
        }
        }

})();