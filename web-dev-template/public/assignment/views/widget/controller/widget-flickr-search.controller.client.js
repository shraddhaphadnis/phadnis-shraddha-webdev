(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);
    function FlickrImageSearchController($routeParams,$location, FlickrService, WidgetService) {
        var vm=this;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            vm.widgetId = $routeParams.wgid;
        }
        init();
        function searchPhotos(searchTerm) {
            console.log("ds");
            FlickrService
                .searchPhotos(searchTerm)
                .then(function (response) {
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            console.log("in here");

            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var widget ={};
            widget._id = vm.widgetId;
            console.log(widget._id);
            widget.widgetType = "image";
            widget.width = "100%";
            widget.url = url;
            widget.pageId = vm.pageId;
            WidgetService
                .updateWidget(vm.widgetId,widget)
                .then(function (){
                    console.log("inside then");
                    console.log(widget);
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                });
        }


    }
})();

