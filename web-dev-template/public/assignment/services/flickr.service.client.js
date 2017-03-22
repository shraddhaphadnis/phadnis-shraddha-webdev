(function(){
    angular
        .module("WebAppMaker")
        .factory("FlickrService",FlickrService);

    function FlickrService($http) {
        var api = {
            "searchPhotos":searchPhoto
        };
        return api;

        function searchPhoto(searchTerm) {
            var key = "14ddb80ae5cb22bd5fa0ab4ad883f66d";
            var secret = "022ebf2e6f59f02e";
            var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();
