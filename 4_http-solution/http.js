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


  module.controller('CommentListCtrl', function($scope, $http, $route, $q) {
    $http.get('/api/comments').success(function(comments) {
      $scope.comments = comments;
    });

    $scope.addComment = function() {
      $http.post('/api/comments', $scope.newComment).then($route.reload);
      $scope.newComment = {};
    };

    $scope.deleteAllComments = function() {
      var requests = [];
      for(var i = 0; i < $scope.comments.length; ++i) {
        requests.push($http.delete('/api/comments/' + $scope.comments[i].id));
      };
      $q.all(requests).then($route.reload);
    };

  });

  module.controller('CommentCtrl', function($scope, $http, $routeParams, $location) {
    var commentId = $routeParams.commentId;
    $http.get('/api/comments/' + commentId).success(function(comment) {
      $scope.comment = comment;
    });

    $scope.deleteComment = function() {
      $http.delete('/api/comments/' + commentId).success(function() {
        $location.url('/comments');
      });
    }
  });

  module.service('commentService', function($resource) {
    return $resource('/api/comments/:commentId', {commentId: '@id'});
  });

  module.controller('CommentListCtrlResource', function(commentService, $scope, $route) {
    $scope.comments = commentService.query();

    $scope.addComment = function() {
      commentService.save($scope.newComment).$promise.then($route.reload);
      $scope.newComment = {};
    };
  });

  module.controller('CommentCtrlResource', function(commentService, $scope, $location, $routeParams) {
    var commentId = $routeParams.commentId;
    $scope.comment = commentService.get({commentId: commentId});
    $scope.deleteComment = function() {
      $scope.comment.$delete().then(function() {
        $location.url('/comments');
      });
    };
  });

  module.filter('commentUrl', function() {
    return function(comment) {
      if(comment && comment.id) {
        return '#/comments/' + comment.id;
      }
      return '';
    }
  });
})();
