/**
 * Created by shrad on 3/29/2017.
 */

(function () {
    angular
        .module ("MyHotelApp")
        .factory("UserService", UserService)
    function UserService($http){
        var api = {
            createUser:createUser,
            createUserAdmin : createUserAdmin,
            findUserById : findUserById,
            findCurrentUser: findCurrentUser,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            deleteUser : deleteUser,
            deleteUserAdmin: deleteUserAdmin,
            getAllRegUsers: getAllRegUsers,
            login:login,
            logout:logout,
            register:register,
            checkLogin: checkLogin,
            checkAdmin: checkAdmin,
            FollowUser:FollowUser,
            findUserByIds: findUserByIds,
            likeHotel: likeHotel,
            undoLikeHotel: undoLikeHotel,
            isHotelLiked: isHotelLiked,
            follow:follow,
            unfollow:unfollow,
            findUserWhoLikedHotel:findUserWhoLikedHotel,
            findUsersToDeleteFromFollowers : findUsersToDeleteFromFollowers,
            findUsersToDeleteFromFollowing:findUsersToDeleteFromFollowing,
            removeFromFollowers:removeFromFollowers,
            removeFromFollowing:removeFromFollowing

        };
        return api;

        function findUsersToDeleteFromFollowers(toBeRemovedId) {
            return $http.get("/api/removeFollowers/"+toBeRemovedId);

        }
        function findUsersToDeleteFromFollowing(toBeRemovedId) {
            return $http.get("/api/removeFollowing/"+toBeRemovedId);

        }

        function removeFromFollowers(currentUserId,toBeRemovedId) {
            return $http.delete("/api/removeFollower/currentUser/"+currentUserId+"/deleteUser/"+toBeRemovedId);

        }

        function removeFromFollowing(currentUserId,toBeRemovedId) {
            return $http.delete("/api/removeFollowing/currentUser/"+currentUserId+"/deleteUser/"+toBeRemovedId);

        }
        function findUserWhoLikedHotel(hotelId) {
            return $http.get("/api/allUsers/"+hotelId);

        }
        function follow(loggedInUserId,secondUserId){
            return $http.put("/api/user/"+loggedInUserId+"/user2/"+secondUserId);
        }

        function unfollow(loggedInUserId,secondUserId){
            return $http.put("/api/user/"+loggedInUserId+"/user2/"+secondUserId+"/unfollow");
        }

        function likeHotel(userId,HotelId,cityId) {
            console.log("like hotel called"+ HotelId);
            return $http.put("/api/user/" + userId + "/city/" + cityId + "/hotelDetails/" + HotelId + "/like");
        }

        function undoLikeHotel(userId,HotelId,cityId) {
            console.log("unlike hotel called");
            return $http.put("/api/user/" + userId + "/city/" + cityId + "/hotelDetails/" + HotelId + "/undolike");
        }

        function isHotelLiked(userId,HotelId,cityId) {
            console.log("service client called"+HotelId);
            return $http.get("/api/user/" + userId + "/city/" + cityId + "/hotelDetails/" + HotelId + "/isHotelliked");
        }


        function getAllRegUsers() {
            var url = '/api/getAllUsers/';
            return $http.get(url);
        }

        function FollowUser(followerId, followeeId) {
            console.log("followerId"+followerId);
            console.log("followeeId"+followeeId);
            return $http.put("/api/user/" + followerId + "/follows/" + followeeId);
        }

        function findCurrentUser() {
            var url = '/api/user/';
            return $http.get(url);
        }

        function register(user) {
            console.log("user called client");
            var url = '/api/register/';
            return $http.post(url,user);
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function checkLogin() {
            return $http.post("/api/checkLogin");
        }

        function checkAdmin() {
            return $http.post("/api/checkAdmin");
        }

        function login(user) {
            console.log(user);
            return $http.post('/api/login', user);
        }

        function createUser(user) {
            var url = '/api/user';
            return $http.post(url,user);
        }

        function createUserAdmin(user) {
            return $http.post('/api/project/admin/user', user);
        }

        function findUserById(userId) {
            var url = '/api/user/' +  userId;
            return $http.get(url);

        }
        function findUserByIds(userIds) {
            for (id in userIds) {
                return findUserById(userIds)
            }
        }
        function findUserByUsername(username) {
            var url = '/api/user?username='+username;
            return $http.get(url);
        }
        function findUserByCredentials(username, password) {
            console.log("find user by credentials called"+username + " "+password);
            var url = '/api/user?username='+username+'&password='+password;
            return $http.get(url);
        }
        function updateUser(userId,user) {
            console.log("server client"+userId);
            var url = "/api/user/" + userId;
            return $http.put(url,user);
        }
        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);

        }
        function deleteUserAdmin(userId) {
            console.log("delete user admin client");
            return $http.delete('/api/admin/user/' + userId);
        }
    }
})();