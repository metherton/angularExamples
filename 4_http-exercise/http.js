(function() {
  var module = angular.module('httpExercise', ['ngResource', 'ngRoute']);
  module.config(function($routeProvider) {
    $routeProvider
      .when('/comments', {
        templateUrl: 'partials/commentList.html',
        controller: 'CommentListCtrl'})
      .when('/comments/:commentId', {
        templateUrl: 'partials/comment.html',
        controller: 'CommentCtrl'})
      .otherwise({redirectTo: '/comments'});
  });


  module.controller('CommentListCtrl', function($scope, $http, $route) {
    // TODO fetch the comments using the $http service
    // $http.get(...

    $scope.addComment = function() {
      // TODO post the new comment to the backend.
      // Remember to reload page afterwards using $route.reload
      // $http.post(...
      $scope.newComment = {};
    };
  });

  module.controller('CommentCtrl', function($scope, $http, $routeParams, $location) {
    var commentId = $routeParams.commentId;
    // TODO get the comment from the backend
    // $http.get

    $scope.deleteComment = function() {
      // TODO EXTRA delete the comment.
      // After deletion, change the URL to display the list of comments using $location
      // $http.delete(...
    }
  });

  // TODO EXTRA use the $resource service to implement the functionality above.

  module.filter('commentUrl', function() {
    return function(comment) {
      if(comment && comment.id) {
        return '#/comments/' + comment.id;
      }
      return '';
    }
  });
})();
