(function () {
    angular
        .module("WhiteBoardApp")
        .factory("CourseService",CourseService);

    function CourseService($http) {
        var service = {
            createCourse : createCourse,
            readAllCourses : readAllCourses,
            deleteCourseById: deleteCourseById,
            updateCourseById : updateCourseById,
            readOneCourseById : readOneCourseById
        };
        return service;

        function readAllCourses (callback) {
            $http
                .get("/rest/course")
                .success(callback);
        }

        function readOneCourseById(id,callback) {
            $http
                .get("/rest/course/" + id)
                .success(callback);
        }
        function createCourse(course,callback) {
            $http
                .post("/rest/course",course)
                .success(callback);
        }
        function deleteCourseById(id,callback) {
            $http
                .delete("/rest/course/" + id)
                .success(callback);
        }
        function updateCourseById() {
            
        }
    }
})();