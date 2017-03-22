(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams,$location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;
        vm.searchImage = searchImage;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function(widget){
                    vm.widget = widget;
                });
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widget/template/editor/widget-'+type+'-editor.view.client.html';
        }

        function deleteWidget(){
            var promise = WidgetService
                .deleteWidget(vm.widgetId)
                .success(function (widget) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                });
        }

        function updateWidget(){
            var promise = WidgetService
                .updateWidget(vm.widgetId,vm.widget)
                .success(function (widget) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                });
        }

        function searchImage() {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId+"/flickr");
        }
    }
})();
