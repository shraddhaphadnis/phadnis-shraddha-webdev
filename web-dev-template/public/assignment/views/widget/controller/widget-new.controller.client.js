(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController(WidgetService, $routeParams, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.pageId = $routeParams.pid;
        vm.websiteId = $routeParams.wid;
        vm.widgetId = $routeParams.wgid;
        vm.createWidget = createWidget;

        function init() {
            var promise = WidgetService
                .findAllWidgetsForPage(vm.pageId)
                .success(function (widget) {
                    vm.widgets = widget;
                });
        }

        init();


        function createWidget(widgetType) {
            newWidget = {};
            console.log(widgetType);
            //newWidget._id = (new Date()).getTime().toString();
            newWidget.type = widgetType;
            newWidget.pageId = vm.pageId;
            switch (widgetType) {
                case "heading":
                    newWidget.text = "Default Text";
                    newWidget.size = 3;
                    break;
                case "image":
                    newWidget.url = "https://i.ytimg.com/vi/fFi4BhD_DUw/maxresdefault.jpg";
                    newWidget.width = "100%";
                    break;
                case "youtube":
                    newWidget.url = "https://youtu.be/AM2Ivdi9c4E";
                    newWidget.width = "100%";
                    break;
                case "html":
                    newWidget.text = "Default Text";
                    break;
                case "text":
                    newWidget.name = "Default Text";
                    break;
            }
            var promise = WidgetService
                .createWidget(vm.pageId, newWidget)
                .success(function (widget) {
                    console.log("create widget success"+widget._id);
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id);
                });
        }
    }
})();