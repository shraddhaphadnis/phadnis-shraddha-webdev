(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService($http) {
        var api = {
            "createWidget": createWidget,
            "findAllWidgetsForPage": findAllWidgetsForPage,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget":deleteWidget,
            "updateWidgetOrder": updateWidgetOrder
        };
        return api;

        function findAllWidgetsForPage(pageId) {
            return $http.get("/api/page/"+pageId+"/widget");
        }

        function createWidget(pageId,widget) {
            return $http.post("/api/page/"+pageId+"/widget",widget);
        }

        function deleteWidget(widgetId) {
            return $http.delete("/api/widget/"+widgetId);
        }

        function updateWidget(widgetId,widget) {
            return $http.put("/api/widget/"+widgetId,widget);
        }

        function findWidgetById(widgetId) {
            return $http.get("/api/widget/"+widgetId);
        }

        function updateWidgetOrder(pageId, startIndex, endIndex) {
            return $http.put("/page/" + pageId + "/widget?initial=" + startIndex + "&final=" + endIndex);
        }
    }
})();