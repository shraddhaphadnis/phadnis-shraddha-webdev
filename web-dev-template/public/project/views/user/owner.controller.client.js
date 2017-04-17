/**
 * Created by shrad on 4/14/2017.
 */
(function() {
    angular
        .module("MyHotelApp")
        .controller("OwnerController", OwnerController)

function OwnerController($routeParams, UserService,$location,HotelService,CityService,loggedin,$rootScope,BusinessService) {
    var vm = this;
    //vm.userId = $routeParams["uid"];
    vm.userId = loggedin.data._id;
    console.log(vm.userId);
    vm.secondUserId = $rootScope.Seconduser;
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
                    getBusiness();
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
    vm.logout = logout;
    vm.setSecondUser = setSecondUser;
    vm.getBusiness = getBusiness;
    vm.setHotel = setHotel;

    function deleteUser(user) {
        console.log("delete user called in owner controller");
        var answer = confirm("Are you sure?");
        if (answer) {
            UserService
                .deleteUser(user._id)
                .then(function () {
                    UserService.findUsersToDeleteFromFollowers(user._id)
                        .then(function (response1) {
                            var deleteFromFollowers=response1.data;
                            deleteFromFollowers.forEach(function (element, index, array) {
                                UserService.removeFromFollowers(deleteFromFollowers[index]._id, user._id);
                            })
                            UserService.findUsersToDeleteFromFollowing(user._id)
                                .then(function (response2) {
                                    var deleteFromFollowing=response2.data;
                                    deleteFromFollowing.forEach(function (element, index, array) {
                                        UserService.removeFromFollowing(deleteFromFollowing[index]._id,user._id);
                                    })
                                });
                        });
                })
                .then(function () {
                    if(user.role=="OWNER") {
                        console.log("user role set as owner in owner controller");
                        BusinessService.findBusinessByUser(user.username)
                            .then(function (business) {
                                if (business.length == 0) {
                                    $location.url("/login");
                                }
                                else {
                                    for (b in business.data) {
                                        BusinessService.deleteBusiness(business.data[b]._id)
                                            .success(function () {
                                                $location.url("/login");
                                            })
                                    }
                                }
                            })
                    }
                    else{
                        $location.url("/login");
                    }

                })
        }
    }

    function setHotel(hotel) {
        $rootScope.cityId = hotel.cityId;
        $rootScope.hotelId = hotel.hotelId;
    }
    
    function getBusiness() {
        vm.businessowned = [];
        UserService
            .findUserById(vm.userId)
            .success((function (user) {
                if (user.business.length == 0)
                {
                    vm.businessowned = [];
                }
                else {
                    for (b in user.business) {
                        BusinessService
                            .findBusinessById(user.business[b])
                            .success(function (businessDetails) {
                                CityService.findCityIdByCityName(businessDetails.hotelCity)
                                    .success(function (city1) {
                                        console.log("%%%%%"+city1["City ID"]);
                                        vm.hotelId = businessDetails.hotelId;
                                        vm.hotelName = businessDetails.hotelName;
                                        vm.hotelCity = businessDetails.hotelCity;
                                        vm.cityId = city1["City ID"];
                                        console.log(vm.cityId);
                                        newbusiness =
                                            {
                                                hotelId : vm.hotelId,
                                                cityId : vm.cityId,
                                                hotelName : vm.hotelName
                                            }
                                        vm.businessowned.push(newbusiness);
                                    })
                            })
                    }
                }
            }))
    }

    function setSecondUser(user) {
        $rootScope.seconduser = user._id;
    }

    function logout(){
        UserService
            .logout()
            .then(
                function (response) {
                    $rootScope.currentUser = null;
                    $location.url("/login");
                }
            )
    }

    function searchHotel(city,hotelId) {
        vm.cityId;
        console.log("&&&&&&&&&&&" + city);

        CityService.findCityIdByCityName(city)
            .success(function (city1) {
                console.log("%%%%%"+city1["City ID"]);
                vm.cityId = city1["City ID"];
                console.log(vm.cityId);
                vm.hotelId = hotelId;
                if (vm.userId == null) {
                    $rootScope.hotelId = vm.hotelId;
                    $rootScope.cityId = vm.cityId;
                    $location.url("/home/city/hotelDetails/");
                }
                else {
                    $rootScope.hotelId = vm.hotelId;
                    $rootScope.cityId = vm.cityId;
                    $location.url("/user/city/hotelDetails/");
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
        console.log("get choice called" + choice);
        if (choice == 'EDIT') {
            return "views/user/profile-owner-" + choice + ".view.client.html";
        }
        else {
            return "views/user/profile-" + choice + ".view.client.html";
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

    function logout(){
        UserService
            .logout()
            .then(
                function (response) {
                    $rootScope.currentUser = null;
                    $location.url("/login");
                }
            )
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

  /*  function deleteUser(userId){

        UserService.deleteUser(userId)
            .success(function(response){
                if(response == 'OK'){
                    $location.url("/login");
                }
            })
            .error(function(){
            });
    }*/
}
})();