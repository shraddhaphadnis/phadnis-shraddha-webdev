(function ()
{
    angular
        .module("WhiteBoardApp",[])
        .controller("CourseController",CourseController);

    function CourseController($scope,$http,CourseService) {
        CourseService.readAllCourses(renderCourses);

        $scope.renderCourses = renderCourses;
        $scope.selectCourse = selectCourse;
        $scope.removeCourse = removeCourse;
        $scope.createCourse = createCourse;

        function createCourse(course) {
            CourseService.createCourse(course,renderCourses);
        }
        function removeCourse(index) {
            CourseService.deleteCourseById(index,renderCourses);
        }
        function renderCourses(response) {
            $scope.courses = response;
        }
        function selectCourse(index) {
            $scope.selectedCourseIndex = index;
            CourseService.readOneCourseById(index,function(response) {
                $scope.course = response;
            });
        }

    }
})();

