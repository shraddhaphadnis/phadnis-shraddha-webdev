/**
 * Created by shrad on 1/16/2017.
 */
angular
    .module('BlogApp', [])
    .controller('BlogController', Blogcontroller)

function Blogcontroller($scope)
{
    $scope.blogposts = [
        {title:'abc', content: '123'},
        {title:'def', content: '567'}
    ];
    $scope.createblogposts = createblogposts;
    $scope.deletepost = deletepost;
    $scope.updatepost = updatepost;
    $scope.selectedIndex = -1;
    $scope.updateblogpost = updateblogpost;

    function updateblogpost(post) {
        $scope.blogposts[$scope.selectedIndex].title = post.title;
        $scope.blogposts[$scope.selectedIndex].content = post.content;

    }
    function updatepost(post)
    {
        $scope.selectedIndex = $scope.blogposts.indexOf(post)
        $scope.post = {};
        $scope.post.title = post.title;
        $scope.post.content = post.content;
    }
    function createblogposts(post) {
        console.log(post)
        var newpost = {
            title: post.title,
            content: post.content
        };
        $scope.blogposts.push(newpost)
         }
    function deletepost(post) {
        console.log(post)
        var index = $scope.blogposts.indexOf(post)
        console.log(index)
        $scope.blogposts.splice(index,1)
    }
}